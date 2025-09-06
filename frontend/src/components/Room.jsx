import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import CalendarLib from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ROOMS = [
  "Room 1",
  "Room 2",
  "Room 3",
  "Room 4",
  "Room 5",
  "Room 6",
  "Room 7",
  "Room 8",
  "Room 9",
  "Room 10",
];

const HOURS = Array.from({ length: 15 }, (_, i) => `${8 + i}:00`);

const Room = () => {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Container className="p-4">
      <Row className="flex-column align-items-center">
        <Col xs="auto" className="mb-3 d-flex flex-column align-items-center">
          <h5 className="mb-3 text-center" style={{ maxWidth: "100px" }}>
            Seleziona stanza :
          </h5>
          <Form.Select
            className="mb-3"
            style={{ maxWidth: "250px" }}
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            {ROOMS.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs="auto" className="mb-3">
          <CalendarLib
            onChange={setSelectedDate}
            value={selectedDate}
            locale="it-IT"
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6} className="mt-3">
          <h4 className="mt-4">
            Disponibilità {selectedRoom} –{" "}
            {selectedDate.toLocaleDateString("it-IT", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h4>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th className="bg-dark text-white">Ora</th>
                <th className="bg-dark text-white">{selectedRoom}</th>
              </tr>
            </thead>
            <tbody>
              {HOURS.map((hour) => (
                <tr key={hour}>
                  <td>{hour}</td>
                  <td>-----</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
