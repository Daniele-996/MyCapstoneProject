import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRooms, fetchReservations } from "../redux/actions";
import {
  Card,
  Row,
  Col,
  ListGroup,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";

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

      if (currentDate) {
        dispatch(fetchReservations(currentDate));
      } else {
        dispatch(fetchReservations());
      }
    }
  }, [token, currentDate, dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-4">
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  if (errorMessage) {
    return <Alert variant="danger">{errorMessage}</Alert>;
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {rooms.map((room) => (
        <Col key={room.id}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-center">
                {room.nameRoom}
                <Badge
                  bg={
                    room.orthopedicBed === "AVAILABLE" ? "success" : "secondary"
                  }
                >
                  {room.orthopedicBed}
                </Badge>
              </Card.Title>

              <ListGroup variant="flush" className="mt-3">
                {room.timeSlots && room.timeSlots.length > 0 ? (
                  room.timeSlots.map((slot) => {
                    const isReserved = reservations.some(
                      (res) =>
                        res.roomId === room.id &&
                        (!currentDate || res.date === currentDate) &&
                        res.timeSlotId === slot.id
                    );

                    return (
                      <ListGroup.Item
                        key={slot.id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <div>
                          <Badge bg={isReserved ? "danger" : "success"}>
                            {isReserved ? "OCCUPATA" : "DISPONIBILE"}
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    );
                  })
                ) : (
                  <ListGroup.Item className="text-center text-muted">
                    Nessun orario disponibile
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TableRooms;
