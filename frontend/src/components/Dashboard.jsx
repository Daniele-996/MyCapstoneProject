import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Calendar from "./Calendar";
import TableRooms from "./TableRooms";
import BackBtn from "./BackBtn";

const Dashboard = () => {
  const currentDate = useSelector((state) => state.calendar.currentDate);

  return (
    <Container fluid className="py-4 d-flex flex-column align-items-center">
      <div className="mb-4 w-100 d-flex justify-content-center">
        <Calendar />
      </div>
      {currentDate && (
        <div className="w-100">
          <h4 className="app-title">
            Disponibilità :{" "}
            {new Date(currentDate).toLocaleDateString("it-IT", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h4>
          <TableRooms />
        </div>
      )}{" "}
      <BackBtn />
    </Container>
  );
};

export default Dashboard;
