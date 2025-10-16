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
  InputGroup,
} from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
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
    confirmPassword: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "phone") {
      const onlyNums = e.target.value.replace(/\D/g, "");
      setForm({ ...form, phone: onlyNums });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Le password non coincidono!");
      return;
    }
    const fixedForm = {
      ...form,
      phone: form.phone.startsWith("+39") ? form.phone : `+39${form.phone}`,
    };
    const payload = { ...fixedForm };
    delete payload.confirmPassword;
    const success = await dispatch(registerUser(payload));
    if (success) {
      setSuccessMsg("Benvenuto! Ora puoi effettuare il login!");
      setTimeout(() => navigate("/login"), 3000);
    } else navigate("/register");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row
        className="d-flex justify-content-center"
        style={{ maxWidth: "100%" }}
      >
        <Col xs={10} sm={8} md={6} className="my-3">
          <Card className="app-card border-0">
            <Card.Img variant="top" src={registrazione} />
            <Card.Body>
              <Card.Title className="app-title">Registrati</Card.Title>

              {errorMessage && (
                <Alert className="app-alert" variant="danger">
                  {errorMessage}
                </Alert>
              )}
              {successMsg && (
                <Alert className="app-alert" variant="success">
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
                    className="custom-input"
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
                    className="custom-input"
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
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Inserisci la password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="custom-input"
                    />
                    <Button
                      type="button"
                      variant="outline-light"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? <EyeSlash /> : <Eye />}
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </Button>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Almeno una maiuscola, una minuscola, un numero ed un
                    carattere speciale!
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Conferma password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Ripeti la password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className="custom-input"
                    />
                    <Button
                      type="button"
                      variant="outline-light"
                      onClick={() => setShowConfirmPassword((s) => !s)}
                      aria-label={showConfirmPassword ? <EyeSlash /> : <Eye />}
                    >
                      {showConfirmPassword ? <EyeSlash /> : <Eye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Numero di telefono (senza +39)"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="custom-input"
                  />
                  <Form.Text className="text-muted">
                    Inserisci solo il numero, il prefisso +39 viene aggiunto
                    automaticamente.
                  </Form.Text>
                </Form.Group>

                <Button type="submit" className="btn-secondary-custom w-100">
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
