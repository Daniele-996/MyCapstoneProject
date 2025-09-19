import { useState } from "react";
import login from "../assets/login.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, loginUser } from "../redux/actions";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Image,
  Card,
} from "react-bootstrap";
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
    <Container className="d-flex justify-content-center align-items-center ">
      <Row
        className="d-flex justify-content-center"
        style={{ maxWidth: "100%" }}
      >
        <Col xs={10} sm={8} md={6} className="my-3">
          <Card className="new-dark text-white border-0">
            <Card.Img variant="top" src={login} />
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>

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
            </Card.Body>

            {errorMessage && (
              <Alert className="mx-3" variant="danger">
                {errorMessage}
              </Alert>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormLogin;
