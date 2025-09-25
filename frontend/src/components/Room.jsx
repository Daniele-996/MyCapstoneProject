import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Button,
  Form,
  Container,
  Alert,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import { createRoom, deleteRoom } from "../redux/actions";
import { Trash, Plus } from "react-bootstrap-icons";
import BackBtn from "./BackBtn";

const Room = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((s) => s.rooms.content);

  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [newRoomName, setNewRoomName] = useState("");
  const [orthopedicBed, setOrthopedicBed] = useState("AVAILABLE");
  const [roomToDelete, setRoomToDelete] = useState("");

  const [alert, setAlert] = useState(null);

  const handleCreate = () => {
    if (!newRoomName) return;
    dispatch(createRoom({ nameRoom: newRoomName, orthopedicBed }));
    setNewRoomName("");
    setOrthopedicBed("AVAILABLE");
    setShowCreate(false);
    setAlert({ type: "success", message: "Stanza creata con successo!" });
  };

  const handleDelete = () => {
    if (!roomToDelete) return;
    dispatch(deleteRoom(roomToDelete));
    setRoomToDelete("");
    setShowDelete(false);
    setAlert({ type: "info", message: "Stanza eliminata con successo!" });
  };

  return (
    <>
      <Container className="page-centered">
        <Container className="app-card text-center">
          <h3 className="app-title">Gestione Stanze</h3>

          {alert && (
            <Alert
              variant={alert.type}
              onClose={() => setAlert(null)}
              dismissible
              className="app-alert"
            >
              {alert.message}
            </Alert>
          )}

          <Button
            className="btn-success-custom me-3"
            onClick={() => setShowCreate(true)}
          >
            <Plus /> Crea Stanza
          </Button>

          <Button
            className="btn-danger-custom"
            onClick={() => setShowDelete(true)}
          >
            <Trash /> Elimina Stanza
          </Button>

          <Modal
            className="app-card"
            show={showCreate}
            onHide={() => setShowCreate(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Crea nuova stanza</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nome stanza</Form.Label>
                  <Form.Control
                    type="text"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="Inserisci nome stanza"
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Letto ortopedico</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle className="custom-dropdown w-100">
                      {orthopedicBed === "AVAILABLE"
                        ? "Disponibile"
                        : "Non disponibile"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="custom-dropdown-menu w-100">
                      <Dropdown.Item
                        onClick={() => setOrthopedicBed("AVAILABLE")}
                      >
                        Disponibile
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setOrthopedicBed("NOT_AVAILABLE")}
                      >
                        Non disponibile
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn-secondary-custom"
                onClick={() => setShowCreate(false)}
              >
                Annulla
              </Button>
              <Button className="btn-success-custom" onClick={handleCreate}>
                Crea
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            className="app-card"
            show={showDelete}
            onHide={() => setShowDelete(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Elimina stanza</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Seleziona stanza</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle className="custom-dropdown w-100">
                      {roomToDelete
                        ? rooms.find((r) => r.id === parseInt(roomToDelete))
                            ?.nameRoom
                        : "-- Seleziona --"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="custom-dropdown-menu w-100">
                      {rooms.map((room) => (
                        <Dropdown.Item
                          key={room.id}
                          onClick={() => setRoomToDelete(room.id.toString())}
                        >
                          {room.nameRoom} ({room.orthopedicBed})
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn-secondary-custom"
                onClick={() => setShowDelete(false)}
              >
                Annulla
              </Button>
              {roomToDelete && (
                <Button className="btn-danger-custom" onClick={handleDelete}>
                  Elimina
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </Container>
      </Container>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <BackBtn />
        </Col>
      </Row>
    </>
  );
};

export default Room;
