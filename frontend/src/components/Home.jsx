import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../redux/reducers/authSlice";
import {
  Container,
  Button,
  Form,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Email e password sono obbligatorie");
      return;
    }

    try {
      const endpoint =
        mode === "login"
          ? "https://tuo-backend.com/api/auth/login"
          : "https://tuo-backend.com/api/auth/register";

      const bodyData =
        mode === "login"
          ? { email, password }
          : { firstName, lastName, phone, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Errore durante la richiesta");
      }

      const data = await res.json();
      // data : firstName, lastName, phone, email, role, token

      dispatch(
        login({
          username: data.firstName + " " + data.lastName,
          role: data.role,
          email: data.email,
          phone: data.phone,
          token: data.token,
        })
      );

      navigate(data.role === "ADMIN" ? "/stanze" : "/calendar");
    } catch (err) {
      console.error(err);
      alert("Errore: " + err.message);
    }
  };

  return (
    <Container className="p-4">
      <h2>Benvenuto nel tuo spazio di lavoro!</h2>

      <ToggleButtonGroup
        type="radio"
        name="mode"
        value={mode}
        onChange={(val) => setMode(val)}
        className="mb-3"
      >
        <ToggleButton id="tbg-radio-1" value="login" variant="outline-dark">
          Login
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value="register" variant="outline-dark">
          Registrazione
        </ToggleButton>
      </ToggleButtonGroup>

      <Form>
        {mode === "register" && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant="dark">
          {mode === "login" ? "Accedi" : "Registrati"}
        </Button>
      </Form>
    </Container>
  );
};

export default Home;
