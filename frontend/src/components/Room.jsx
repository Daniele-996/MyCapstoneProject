import { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "./Calendar";
import TableRooms from "./TableRooms";
import { fetchRooms } from "../redux/actions";

const Room = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.content);
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const token = useSelector((state) => state.auth.token);

  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (token) dispatch(fetchRooms());
  }, [token, dispatch]);

  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0]);
    }
  }, [rooms, selectedRoom]);

  return (
    <Container className="p-4">
      <h2 className="mb-4 text-center">Seleziona una stanza</h2>

      <Row className="mb-4 d-flex justify-content-center">
        {rooms.map((room) => (
          <Col xs="auto" key={room.id} className="mb-2">
            <Button
              variant={selectedRoom?.id === room.id ? "dark" : "outline-dark"}
              onClick={() => setSelectedRoom(room)}
            >
              {room.nameRoom}
            </Button>
          </Col>
        ))}
      </Row>

      <Row>
        <Col md={4}>
          <Calendar />
        </Col>
        <Col md={8}>{selectedRoom && currentDate && <TableRooms />}</Col>
      </Row>
    </Container>
  );
};

export default Room;
