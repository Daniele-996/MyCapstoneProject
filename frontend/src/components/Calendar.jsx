import { useSelector, useDispatch } from "react-redux";
import CalendarLib from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { setDate } from "../redux/actions";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useState } from "react";

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

const Calendar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    const isoDate = date.toLocaleDateString("sv-SE");
    dispatch(setDate(isoDate));
    setSelectedDate(isoDate);
  };

  return (
    <div className="calendar-main">
      <Container className="p-3 calendar-wrapper calendar-left">
        <Row className="justify-content-center">
          <Col className="text-center mx-3">
            <CalendarLib
              onChange={handleChange}
              value={
                currentDate ? new Date(currentDate + "T00:00:00") : new Date()
              }
              locale="it-IT"
            />
          </Col>
        </Row>
      </Container>
      {selectedDate && (
        <Container fluid className="calendar-table-wrapper">
          <h4 className="m-2">
            Disponibilità{" "}
            {selectedDate &&
              new Date(selectedDate).toLocaleDateString("it-IT", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
          </h4>
          <Table bordered responsive className="rounded">
            <thead>
              <tr>
                <th>Ora</th>
                {ROOMS.map((room) => (
                  <th key={room}>{room}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((hour) => (
                <tr key={hour}>
                  <td>{hour}</td>
                  {ROOMS.map((room) => (
                    <td key={room + hour}>-</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </div>
  );
};

export default Calendar;
