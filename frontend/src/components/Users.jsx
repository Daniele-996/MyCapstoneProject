import { useSelector, useDispatch } from "react-redux";
import { Table, Alert, Modal, Button, Badge } from "react-bootstrap";
import { updateUserRole, deleteUser } from "../redux/actions";
import { Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Users = () => {
  const users = useSelector((s) => s.user.content);
  const role = JSON.parse(localStorage.getItem("user"))?.role || "USER";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  if (role !== "ADMIN") {
    return (
      <Alert variant="danger" className="text-center w-50 mx-auto mt-3">
        Accesso non autorizzato
      </Alert>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Alert variant="info" className="text-center w-50 mx-auto mt-3">
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
    <>
      <div className="table-responsive my-3">
        <Table bordered className="room-table text-center align-middle">
          <thead>
            <tr>
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
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <Badge
                    bg="outline-secondary"
                    className="action-badge"
                    onClick={() => navigate(`/users/${user.id}/reservations`)}
                  >
                    Prenotazioni
                  </Badge>
                </td>
                <td>
                  <Badge
                    bg="outline-secondary"
                    className="action-badge"
                    onClick={() => navigate(`/users/${user.id}/payments`)}
                  >
                    Pagamenti
                  </Badge>
                </td>
                <td>
                  <div className="d-flex justify-content-around align-items-center">
                    <Badge
                      bg={user.role === "ADMIN" ? "warning text-dark" : "dark"}
                      className="action-badge"
                      style={{ cursor: "pointer" }}
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="room-admin-container"
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
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Users;
