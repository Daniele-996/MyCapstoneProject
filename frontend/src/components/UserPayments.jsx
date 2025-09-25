import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Alert, Card, Container, Col, Row } from "react-bootstrap";
import BackBtn from "./BackBtn";
import {
  fetchRooms,
  fetchUserPayments,
  fetchUserReservations,
  fetchUsers,
} from "../redux/actions";
import { useEffect } from "react";

const UserPayments = () => {
  const { id } = useParams();

  const userPayments = useSelector((s) => s.payments.userPayments);
  const rooms = useSelector((s) => s.rooms.content);
  const users = useSelector((s) => s.user.content);
  const reservations = useSelector((s) => s.reservations.content);
  const dispatch = useDispatch();
  const user = users.find((u) => String(u.id) === id);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserPayments(id));
      dispatch(fetchUsers());
      dispatch(fetchUserReservations(id));
      dispatch(fetchRooms());
    }
  }, [id, dispatch]);

  if (!userPayments || userPayments.length === 0) {
    return (
      <>
        <Alert
          variant="info"
          className="app-alert text-center w-50 mx-auto mt-3"
        >
          Nessun pagamento trovato per questo utente
        </Alert>
        <Row className="mt-3">
          <Col className="d-flex justify-content-center">
            <BackBtn />
          </Col>
        </Row>
      </>
    );
  }

  const total = userPayments.reduce(
    (sum, p) => sum + (p.statusPayment === "NOT_PAID" ? p.amount : 0),
    0
  );

  return (
    <>
      <Container className="page-centered">
        <Card className="room-admin-container app-card w-100">
          <h3 className="app-title">
            Pagamenti di{" "}
            {user ? `${user.firstName} ${user.lastName}` : `Utente #${id}`}
          </h3>

          <div className="table-responsive my-3">
            <Table bordered className="room-table text-center align-middle">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Orario</th>
                  <th>Stanza</th>
                  <th>Costo</th>
                  <th>Stato</th>
                </tr>
              </thead>
              <tbody>
                {userPayments.map((p) => {
                  const reservation = reservations.find(
                    (r) => r.userId === p.user.id && r.amount === p.amount
                  );

                  const room = rooms.find(
                    (rm) => rm.id === reservation?.roomId
                  );

                  const slot = room?.timeSlots.find(
                    (ts) => ts.id === reservation?.timeSlotId
                  );

                  return (
                    <tr key={p.id}>
                      <td>{reservation ? reservation.date : "—"}</td>
                      <td>
                        {slot ? `${slot.startTime} - ${slot.endTime}` : "—"}
                      </td>
                      <td>{room ? room.nameRoom : "—"}</td>
                      <td>
                        {p.statusPayment === "NOT_PAID"
                          ? `${p.amount} €`
                          : "0 €"}
                      </td>
                      <td>
                        {p.statusPayment === "NOT_PAID"
                          ? "NON PAGATO ❌"
                          : "PAGATO ✅"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <div className="text-end mt-3">
            <h5>
              Totale da pagare: <strong>{total} €</strong>
            </h5>
          </div>
        </Card>
      </Container>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <BackBtn />
        </Col>
      </Row>
    </>
  );
};

export default UserPayments;
