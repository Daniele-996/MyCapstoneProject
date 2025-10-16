import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRooms,
  fetchReservations,
  createReservation,
  deleteReservation,
  fetchUsers,
} from "../redux/actions";
import { Table, Badge, Spinner, Alert, Button, Modal } from "react-bootstrap";

const TableRooms = () => {
  const dispatch = useDispatch();

  const rooms = useSelector((s) => s.rooms.content);
  const {
    content: reservations,
    loading,
    error,
  } = useSelector((s) => s.reservations);
  const users = useSelector((s) => s.user.content);
  const currentDate = useSelector((s) => s.calendar.currentDate);

  const [storedUser, setStoredUser] = useState(null);
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setStoredUser(JSON.parse(u));
  }, []);

  const userId = storedUser?.id;
  const role = storedUser?.role || "USER";

  const [pendingReservation, setPendingReservation] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 2200);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  useEffect(() => {
    if (!currentDate) return;
    dispatch(fetchReservations(currentDate));
    if (role === "ADMIN" && users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [currentDate, role, users.length, dispatch]);

  const reservationsMap = {};
  reservations
    .filter((r) => r.date === currentDate)
    .forEach((r) => {
      reservationsMap[`${r.roomId}-${r.timeSlotId}`] = r;
    });

  const allSlots = rooms.flatMap((room) => room.timeSlots);
  const uniqueSlots = Array.from(
    new Map(allSlots.map((s) => [`${s.startTime}-${s.endTime}`, s])).values()
  ).sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleBadgeClick = (room, slot, reserved) => {
    if (!reserved) {
      setPendingReservation({ room, slot });
    } else if (role === "ADMIN") {
      const res = reservationsMap[`${room.id}-${slot.id}`];
      if (res) setPendingDelete(res);
    }
  };

  const confirmReservation = async () => {
    if (!pendingReservation || !userId) {
      setFeedback({ type: "danger", message: "Impossibile prenotare." });
      return;
    }
    try {
      await dispatch(
        createReservation({
          roomId: pendingReservation.room.id,
          userId,
          date: currentDate,
          timeSlotId: pendingReservation.slot.id,
        })
      );
      setFeedback({ type: "success", message: "Prenotazione avvenuta!" });
      dispatch(fetchReservations(currentDate));
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Errore nella prenotazione";
      setFeedback({ type: "danger", message: msg });
    } finally {
      setPendingReservation(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await dispatch(deleteReservation(pendingDelete.id));
      setFeedback({ type: "success", message: "Prenotazione eliminata!" });
      dispatch(fetchReservations(currentDate));
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Errore durante l'eliminazione";
      setFeedback({ type: "danger", message: msg });
    } finally {
      setPendingDelete(null);
    }
  };

  const getDisplayLabel = (reservation) => {
    if (!reservation) return "DISPONIBILE";
    if (reservation.userId === userId) {
      return storedUser?.lastName?.toUpperCase() || "TUO";
    }
    if (role === "ADMIN") {
      return (
        users
          .find((u) => u.id === reservation.userId)
          ?.lastName?.toUpperCase() || "OCCUPATA"
      );
    }
    return "OCCUPATA";
  };

  if (loading && !rooms.length) {
    return (
      <div className="d-flex justify-content-center align-items-center my-4">
        <Spinner animation="border" variant="dark" size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="app-alert text-center">
        {error}
      </Alert>
    );
  }

  return (
    <div className="table-responsive">
      {feedback && (
        <Alert
          variant={feedback.type}
          dismissible
          onClose={() => setFeedback(null)}
          className="app-alert text-center"
        >
          {feedback.message}
        </Alert>
      )}

      <Modal
        show={!!pendingReservation}
        onHide={() => setPendingReservation(null)}
        centered
        className="app-card"
      >
        <Modal.Header closeButton>
          <Modal.Title>Conferma prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pendingReservation && (
            <p>
              Vuoi prenotare la stanza{" "}
              <strong>{pendingReservation.room.nameRoom}</strong> il{" "}
              <strong>
                {new Date(currentDate).toLocaleDateString("it-IT", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </strong>{" "}
              dalle <strong>{pendingReservation.slot.startTime}</strong> alle{" "}
              <strong>{pendingReservation.slot.endTime}</strong>?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-secondary-custom"
            onClick={() => setPendingReservation(null)}
          >
            Annulla
          </Button>
          <Button className="btn-success-custom" onClick={confirmReservation}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={!!pendingDelete}
        onHide={() => setPendingDelete(null)}
        centered
        className="app-card"
      >
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare questa prenotazione?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-secondary-custom"
            onClick={() => setPendingDelete(null)}
          >
            Annulla
          </Button>
          <Button className="btn-danger-custom" onClick={confirmDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      <Table bordered className="room-table text-center align-middle">
        <thead>
          <tr>
            <th className="time-col">Orario</th>
            {rooms.map((room) => (
              <th key={room.id}>{room.nameRoom}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueSlots.map((slot) => (
            <tr key={slot.id}>
              <td className="time-col">{`${slot.startTime} - ${slot.endTime}`}</td>
              {rooms.map((room) => {
                const roomSlot = room.timeSlots.find(
                  (s) =>
                    s.startTime === slot.startTime && s.endTime === slot.endTime
                );
                const key = roomSlot ? `${room.id}-${roomSlot.id}` : null;
                const reservation = key ? reservationsMap[key] : null;
                const reserved = !!reservation;
                const clickable = !reserved || (reserved && role === "ADMIN");
                const isMine = reservation && reservation.userId === userId;
                return (
                  <td key={room.id + "-" + slot.startTime}>
                    <Badge
                      className={
                        !reserved
                          ? "badge-available"
                          : isMine
                          ? "badge-secondary"
                          : "badge-unavailable"
                      }
                      role={clickable ? "button" : undefined}
                      style={{
                        cursor: clickable ? "pointer" : "default",
                        userSelect: "none",
                      }}
                      onClick={
                        clickable
                          ? () =>
                              handleBadgeClick(room, roomSlot || slot, reserved)
                          : undefined
                      }
                    >
                      {getDisplayLabel(reservation)}
                    </Badge>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableRooms;
