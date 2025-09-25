import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Container fluid className="text-center footer text-tertiary">
      <Card.Header> - Tutti i diritti riservati - </Card.Header>
      <Card.Body>
        <Card.Title className="fs-6">• © 2025 OFFICE RESERVATION •</Card.Title>

        <Card.Text className="my-0">
          Telefono : {user ? `${user.phone}` : "+39 000 000 0000"}
        </Card.Text>

        <Card.Text className="my-0">
          Email : {user ? user.email : "email@office.com"}
        </Card.Text>

        <Card.Text className="my-0">
          Sede legale : Corso Italia 45, Roma
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-white">
        {user ? `${user.firstName} ${user.lastName}` : "Since 2025"}
      </Card.Footer>
    </Container>
  );
};

export default Footer;
