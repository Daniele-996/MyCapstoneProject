import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Spinner,
  Badge,
  Table,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchRooms, fetchReservationsRange } from "../redux/actions";

const toISO = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const next7Days = (currentDateISO) => {
  const [y, m, day] = currentDateISO.split("-").map(Number);
  const start = new Date(y, m - 1, day);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

const Room = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((s) => s.rooms.content);
  const reservations = useSelector((s) => s.reservations.content);
  const currentDate = useSelector((s) => s.calendar.currentDate);
  const token = useSelector((s) => s.auth.token);

  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(fetchRooms());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0]);
    }
  }, [rooms, selectedRoom]);

  useEffect(() => {
    if (selectedRoom && currentDate) {
      const [y, m, d] = currentDate.split("-").map(Number);
      const start = new Date(y, m - 1, d);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      dispatch(
        fetchReservationsRange(selectedRoom.id, toISO(start), toISO(end))
      );
    }
  }, [selectedRoom, currentDate, dispatch]);

  if (!selectedRoom) {
    return (
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" />
      </div>
    );
  }

  const fixedSlots = selectedRoom.timeSlots || [];
  const weekDays = next7Days(currentDate);

  const isReserved = (slotId, dayISO) =>
    reservations.some(
      (res) =>
        Number(res.roomId) === Number(selectedRoom.id) &&
        Number(res.timeSlotId) === Number(slotId) &&
        res.date === dayISO
    );

  return (
    <Container fluid className="p-3">
      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Form.Select
            size="md"
            className="room-select bg-dark text-white border-0"
            value={selectedRoom.id}
            onChange={(e) =>
              setSelectedRoom(
                rooms.find((r) => r.id === Number(e.target.value))
              )
            }
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nameRoom}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table className="room-table table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th className="time-col">Orario</th>
              {weekDays.map((d) => (
                <th key={toISO(d)} className="day-col">
                  <div className="d-block">
                    {d.toLocaleDateString("it-IT", { weekday: "short" })}
                  </div>
                  <div className="d-block">
                    {d.toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "numeric",
                    })}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fixedSlots.map((slot) => (
              <tr key={slot.id}>
                <td className="time-col">{`${slot.startTime} - ${slot.endTime}`}</td>
                {weekDays.map((d) => {
                  const iso = toISO(d);
                  const reserved = isReserved(slot.id, iso);
                  return (
                    <td key={`${slot.id}-${iso}`} className="day-col">
                      <Badge
                        className={
                          reserved
                            ? "badge-unavailable w-100"
                            : "badge-available w-100"
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
    </Container>
  );
};

export default Room;
