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

  const fixedSlots = rooms.length > 0 ? rooms[0].timeSlots : [];

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

  const handleBadgeClick = (room, slot, reserved) => {
    if (!reserved) {
      setPendingReservation({ room, slot });
    } else if (role === "ADMIN") {
      const res = reservationsMap[`${room.id}-${slot.id}`];
      if (res) setPendingDelete(res);
    }
  };

  const confirmReservation = () => {
    if (!pendingReservation || !userId) {
      setFeedback({ type: "danger", message: "Impossibile prenotare." });
      return;
    }
    dispatch(
      createReservation({
        roomId: pendingReservation.room.id,
        userId,
        date: currentDate,
        timeSlotId: pendingReservation.slot.id,
      })
    )
      .then(() => {
        setFeedback({ type: "success", message: "Prenotazione avvenuta!" });
        dispatch(fetchReservations(currentDate));
      })
      .catch(() =>
        setFeedback({ type: "danger", message: "Errore nella prenotazione" })
      );
    setPendingReservation(null);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    dispatch(deleteReservation(pendingDelete.id))
      .then(() => {
        setFeedback({ type: "success", message: "Prenotazione eliminata!" });
        dispatch(fetchReservations(currentDate));
      })
      .catch(() =>
        setFeedback({
          type: "danger",
          message: "Errore durante l'eliminazione",
        })
      );
    setPendingDelete(null);
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
      <Alert variant="danger" className="text-center w-50 mx-auto">
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
          className="text-center w-50 mx-auto"
        >
          {feedback.message}
        </Alert>
      )}

      <Modal
        show={!!pendingReservation}
        onHide={() => setPendingReservation(null)}
        centered
        className="room-admin-container"
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
            variant="secondary"
            onClick={() => setPendingReservation(null)}
          >
            Annulla
          </Button>
          <Button variant="success" onClick={confirmReservation}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={!!pendingDelete}
        onHide={() => setPendingDelete(null)}
        centered
        className="room-admin-container"
      >
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare questa prenotazione?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPendingDelete(null)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>

      <Table bordered className="room-table text-center align-middle">
        <thead>
          <tr>
            <th>Orario</th>
            {rooms.map((room) => (
              <th key={room.id}>{room.nameRoom}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fixedSlots.map((slot) => (
            <tr key={slot.id}>
              <td>{`${slot.startTime} - ${slot.endTime}`}</td>
              {rooms.map((room) => {
                const key = `${room.id}-${slot.id}`;
                const reservation = reservationsMap[key];
                const reserved = !!reservation;
                const clickable = !reserved || (reserved && role === "ADMIN");
                const isMine = reservation && reservation.userId === userId;
                return (
                  <td key={key}>
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
                          ? () => handleBadgeClick(room, slot, reserved)
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
