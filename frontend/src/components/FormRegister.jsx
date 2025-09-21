import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import registrazione from "../assets/registrazione.jpg";

const FormRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.error.message);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(registerUser(form));
    if (success) {
      setSuccessMsg("Benvenuto! Ora puoi effettuare il login!");
      setTimeout(() => navigate("/login"), 2200);
    } else navigate("/register");
  };

  return (
    <Container
      fluid
      className="h-100 d-flex justify-content-center align-items-center "
    >
      <Row
        className="d-flex justify-content-center"
        style={{ maxWidth: "100%" }}
      >
        <Col xs={10} sm={8} md={6} className="my-3">
          <Card className="new-dark text-white border-0">
            <Card.Img variant="top" src={registrazione} />
            <Card.Body>
              <Card.Title className="text-center">Registrati</Card.Title>

              {errorMessage && (
                <Alert className="mx-3" variant="danger">
                  {errorMessage}
                </Alert>
              )}
              {successMsg && (
                <Alert className="mx-3" variant="success">
                  {successMsg}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Inserisci il nome"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Inserisci il cognome"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Inserisci l'email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Inserisci la password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Inserisci il numero di telefono"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                  Registrati
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormRegister;
