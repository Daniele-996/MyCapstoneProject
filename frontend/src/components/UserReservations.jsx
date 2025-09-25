import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Alert, Card, Spinner, Row, Col } from "react-bootstrap";
import { fetchUserReservations, fetchUsers } from "../redux/actions";
import BackBtn from "./BackBtn";

const UserReservations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    content: reservations,
    loading,
    error,
  } = useSelector((s) => s.reservations);
  const rooms = useSelector((s) => s.rooms.content);
  const users = useSelector((s) => s.user.content);
  const user = users.find((u) => u.id === Number(id));

  useEffect(() => {
    if (id) {
      dispatch(fetchUserReservations(id));
      dispatch(fetchUsers());
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-4">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="app-alert text-center mt-3">
        {error}
      </Alert>
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <>
        <Alert variant="info" className="app-alert text-center mt-3">
          Nessuna prenotazione trovata per questo utente
        </Alert>
        <Row className="mt-3">
          <Col className="d-flex justify-content-center">
            <BackBtn />
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <div className="table-responsive my-3">
        <Card className="app-card">
          <h3 className="app-title">
            Prenotazioni di{" "}
            {user ? `${user.firstName} ${user.lastName}` : `Utente #${id}`}
          </h3>

          <Table bordered hover className="room-table text-center align-middle">
            <thead>
              <tr>
                <th>Giorno</th>
                <th>Ora</th>
                <th>Stanza</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => {
                const room = rooms.find((rm) => rm.id === r.roomId);
                const slot = room?.timeSlots.find(
                  (ts) => ts.id === r.timeSlotId
                );

                return (
                  <tr key={r.id}>
                    <td>{r.date}</td>
                    <td>
                      {slot ? `${slot.startTime} - ${slot.endTime}` : "—"}
                    </td>
                    <td>{room ? room.nameRoom : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      </div>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <BackBtn />
        </Col>
      </Row>
    </>
  );
};

export default UserReservations;
