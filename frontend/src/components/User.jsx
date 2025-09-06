import { Container } from "react-bootstrap";

const mockUsers = ["mario", "luigi", "peach"];

const User = () => {
  return (
    <Container className="p-4">
      <h2>Gestione utenti</h2>
      <ul>
        {mockUsers.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>
    </Container>
  );
};

export default User;
