import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRooms,
  fetchReservations,
  createReservation,
} from "../redux/actions";
import { Table, Badge, Spinner, Alert, Button } from "react-bootstrap";

const TableRooms = () => {
  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.rooms.content || []);
  const {
    content: reservations,
    loading,
    error,
  } = useSelector((state) => state.reservations);
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.user.id);
  const [pendingReservation, setPendingReservation] = useState(null);

  const fixedSlots = rooms.length > 0 ? rooms[0].timeSlots : [];

  useEffect(() => {
    if (token && rooms.length === 0) {
      dispatch(fetchRooms());
    }
  }, [token, rooms.length, dispatch]);

  useEffect(() => {
    if (token && currentDate) {
      dispatch(fetchReservations(currentDate));
    }
  }, [token, currentDate, dispatch]);

  if (loading && !rooms.length) {
    return (
      <div className="d-flex justify-content-center align-items-center my-4">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  const isReservedCell = (roomId, slotId) =>
    reservations.some(
      (res) =>
        res.roomId === roomId &&
        res.timeSlotId === slotId &&
        res.date === currentDate
    );

  const handleCellClick = (room, slot) => {
    if (!userId) return;
    setPendingReservation({ room, slot });
  };

  const confirmReservation = () => {
    if (!pendingReservation) return;
    dispatch(
      createReservation({
        room: pendingReservation.room.id,
        user: userId,
        date: currentDate,
        timeSlot: pendingReservation.slot.id,
      })
    );
    setPendingReservation(null);
  };

  const cancelReservation = () => {
    setPendingReservation(null);
  };

  return (
    <div className="table-responsive">
      {pendingReservation && (
        <Alert
          variant="info"
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            Confermi la prenotazione per la stanza{" "}
            <strong>{pendingReservation.room.nameRoom}</strong> il{" "}
            <strong>{currentDate}</strong> dalle{" "}
            <strong>{pendingReservation.slot.startTime}</strong> alle{" "}
            <strong>{pendingReservation.slot.endTime}</strong>?
          </div>
          <div>
            <Button
              variant="success"
              size="sm"
              className="me-2"
              onClick={confirmReservation}
            >
              Conferma
            </Button>
            <Button variant="secondary" size="sm" onClick={cancelReservation}>
              Annulla
            </Button>
          </div>
        </Alert>
      )}

      <Table bordered hover className="room-table text-center align-middle">
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
                const reserved = isReservedCell(room.id, slot.id);
                return (
                  <td
                    key={`${room.id}-${slot.id}`}
                    className={!reserved ? "cell-clickable" : ""}
                    onClick={
                      !reserved ? () => handleCellClick(room, slot) : undefined
                    }
                  >
                    <Badge
                      className={
                        reserved ? "badge-unavailable" : "badge-available"
                      }
                    >
                      {reserved ? "OCCUPATA" : "DISPONIBILE"}
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
