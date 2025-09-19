import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRooms, fetchReservations } from "../redux/actions";
import { Table, Badge, Spinner, Alert } from "react-bootstrap";

const TableRooms = () => {
  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.rooms.content || []);
  const reservations = useSelector(
    (state) => state.reservations?.content || []
  );
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const errorMessage = useSelector((state) => state.error.message);
  const token = useSelector((state) => state.auth.token);

  const loading = !rooms.length && !errorMessage;

  useEffect(() => {
    if (token) {
      dispatch(fetchRooms());
      dispatch(fetchReservations(currentDate || null));
    }
  }, [token, currentDate, dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-4">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (errorMessage) {
    return <Alert variant="danger">{errorMessage}</Alert>;
  }

  // prendo tutte le fasce orarie (unione dei timeSlots di tutte le stanze)
  const allSlots = Array.from(
    new Set(
      rooms.flatMap((room) =>
        room.timeSlots
          ? room.timeSlots.map((slot) => slot.startTime + "-" + slot.endTime)
          : []
      )
    )
  );

  return (
    <div className="table-responsive">
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
          {allSlots.map((slotRange) => {
            const [start, end] = slotRange.split("-");
            return (
              <tr key={slotRange}>
                <td>{start}</td>
                {rooms.map((room) => {
                  const slot = room.timeSlots?.find(
                    (s) => s.startTime === start && s.endTime === end
                  );

                  if (!slot) {
                    return <td key={room.id}>-</td>;
                  }

                  const isReserved = reservations.some(
                    (res) =>
                      res.roomId === room.id &&
                      res.timeSlotId === slot.id &&
                      (!currentDate || res.date === currentDate)
                  );

                  return (
                    <td key={room.id + slot.id}>
                      <Badge
                        className={
                          isReserved ? "badge-unavailable" : "badge-available"
                        }
                      >
                        {isReserved ? "OCCUPATA" : "DISPONIBILE"}
                      </Badge>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableRooms;
