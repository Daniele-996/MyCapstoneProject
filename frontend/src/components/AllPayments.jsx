import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Alert,
  Card,
  Container,
  Badge,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { fetchPayments, updatePaymentStatus } from "../redux/actions";
import BackBtn from "./BackBtn";

const AllPayments = () => {
  const dispatch = useDispatch();
  const payments = useSelector((s) => s.payments.content);
  const users = useSelector((s) => s.user.content);
  const [filterUser, setFilterUser] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  if (!payments || payments.length === 0) {
    return (
      <Alert variant="info" className="app-alert text-center w-50 mx-auto mt-3">
        Nessun pagamento trovato
      </Alert>
    );
  }

  const handleStatusChange = (payment) => {
    const newStatus =
      payment.statusPayment === "NOT_PAID" ? "PAID" : "NOT_PAID";
    dispatch(updatePaymentStatus(payment.id, newStatus));
  };

  const filteredPayments = payments.filter((p) => {
    const user = users.find((u) => u.id === p.userId);
    const matchUser =
      !filterUser ||
      (user &&
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(filterUser.toLowerCase()));
    const matchStatus = !filterStatus || p.statusPayment === filterStatus;
    return matchUser && matchStatus;
  });

  const total = filteredPayments
    .filter((p) => p.statusPayment === "NOT_PAID")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      <Container className="page-centered">
        <Card className="room-admin-container app-card w-100">
          <h3 className="app-title">Pagamenti</h3>

          <Row className="mb-3 justify-content-center">
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Filtra per utente"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="custom-input"
              />
            </Col>
            <Col md={3}>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="custom-input"
              >
                <option className="custom-input" value="">
                  Tutti
                </option>
                <option className="custom-input" value="PAID">
                  Pagato
                </option>
                <option className="custom-input" value="NOT_PAID">
                  Non pagato
                </option>
              </Form.Select>
            </Col>
          </Row>

          <div className="table-responsive my-3">
            <Table bordered className="room-table text-center align-middle">
              <thead>
                <tr>
                  <th>Utente</th>
                  <th>Stanza</th>
                  <th>Importo</th>
                  <th>Stato</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p) => {
                  const user = users.find((u) => u.id === p.userId);
                  return (
                    <tr key={p.id}>
                      <td>
                        {user
                          ? `${user.firstName} ${user.lastName}`
                          : p.userEmail}
                      </td>
                      <td>{p.roomName}</td>
                      <td>{p.amount} €</td>
                      <td>
                        <Badge
                          bg={p.statusPayment === "PAID" ? "success" : "danger"}
                          className="action-badge"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleStatusChange(p)}
                        >
                          {p.statusPayment === "PAID" ? "PAGATO" : "NON PAGATO"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <div className="text-end mt-3">
            <h5>
              Totale: <strong>{total} €</strong>
            </h5>
          </div>
        </Card>
      </Container>

      <div className="d-flex justify-content-center mt-4">
        <BackBtn />
      </div>
    </>
  );
};

export default AllPayments;
