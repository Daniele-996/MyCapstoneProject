import { useSelector, useDispatch } from "react-redux";
import CalendarLib from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { setDate } from "../redux/actions";
import { Col, Container, Row } from "react-bootstrap";
import TableRooms from "./TableRooms";
import { useLocation } from "react-router-dom";

const Calendar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.calendar.currentDate);
  const location = useLocation();

  const handleChange = (date) => {
    const isoDate = date.toLocaleDateString("sv-SE");
    dispatch(setDate(isoDate));
  };

  return (
    <Container fluid className="py-4">
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
          className="mb-4 d-flex justify-content-center"
        >
          <CalendarLib
            onChange={handleChange}
            value={
              currentDate ? new Date(currentDate + "T00:00:00") : new Date()
            }
            locale="it-IT"
            tileClassName={({ date, view }) => {
              if (
                view === "month" &&
                (date.getDay() === 0 || date.getDay() === 6)
              ) {
                return "weekend-day";
              }
              return null;
            }}
          />
        </Col>
        <Col lg={8} md={7} sm={12}>
          {currentDate && location.pathname !== "/rooms" && (
            <>
              <h4 className="mb-3 text-center text-md-start">
                Disponibilità{" "}
                {new Date(currentDate).toLocaleDateString("it-IT", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
              <TableRooms />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Calendar;
