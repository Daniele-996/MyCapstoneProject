import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Alert,
  Modal,
  Button,
  Badge,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { updateUserRole, deleteUser } from "../redux/actions";
import { Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BackBtn from "./BackBtn";

const Users = () => {
  const users = useSelector((s) => s.user.content);
  const role = JSON.parse(localStorage.getItem("user"))?.role || "USER";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  if (role !== "ADMIN") {
    return (
      <Alert variant="danger" className="app-alert text-center">
        Accesso non autorizzato
      </Alert>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Alert variant="info" className="app-alert text-center">
        Nessun utente trovato
      </Alert>
    );
  }

  const handleRoleClick = (user) => {
    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    dispatch(updateUserRole(user.id, newRole));
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id));
    }
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <Container className="page-centered">
      <Container className="table-responsive my-3">
        <Table bordered className="room-table text-center align-middle">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Email</th>
              <th style={{ width: "120px" }}>Prenotazioni</th>
              <th style={{ width: "120px" }}>Pagamenti</th>
              <th style={{ width: "150px" }}>Ruolo / Azioni</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {" "}
                  <img
                    src={
                      user.avatarUrl
                        ? user.avatarUrl
                        : `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`
                    }
                    alt={`${user.firstName} ${user.lastName}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <Badge
                    className="action-badge bg-dark-subtle text-dark"
                    onClick={() => navigate(`/users/${user.id}/reservations`)}
                  >
                    Prenotazioni
                  </Badge>
                </td>
                <td>
                  <Badge
                    className="action-badge bg-dark-subtle text-dark"
                    onClick={() => navigate(`/users/${user.id}/payments`)}
                  >
                    Pagamenti
                  </Badge>
                </td>
                <td>
                  <Container className="d-flex justify-content-around align-items-center">
                    <Badge
                      className="action-badge"
                      bg={user.role === "ADMIN" ? "warning text-dark" : "dark"}
                      onClick={() => handleRoleClick(user)}
                    >
                      {user.role}
                    </Badge>
                    <Trash
                      size={18}
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteClick(user)}
                    />
                  </Container>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row className="mt-3">
          <Col className="d-flex justify-content-center">
            <BackBtn />
          </Col>
        </Row>
      </Container>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="app-card"
      >
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare{" "}
          <strong>
            {selectedUser?.firstName} {selectedUser?.lastName}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-secondary-custom"
            onClick={() => setShowDeleteModal(false)}
          >
            Annulla
          </Button>
          <Button className="btn-danger-custom" onClick={confirmDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Users;
