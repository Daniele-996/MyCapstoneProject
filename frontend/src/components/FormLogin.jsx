import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, loginUser } from "../redux/actions";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.error.message);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(form.email, form.password));

    const token = localStorage.getItem("token");
    if (token) {
      await dispatch(fetchUserProfile());
      navigate("/rooms");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col
          md={{ span: 6, offset: 3 }}
          className="p-4 rounded shadow bg-light"
        >
          <h2 className="text-center mb-4">Login</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
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

            <Button variant="dark" type="submit" className="w-100">
              Accedi
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormLogin;
