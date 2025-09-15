import { Container } from "react-bootstrap";

import Card from "react-bootstrap/Card";

const Footer = () => {
  return (
    <Container fluid className="text-center footer text-tertiary">
      <Card.Header> - Tutti i diritti riservati - </Card.Header>
      <Card.Body>
        <Card.Title className="fs-6">
          {" "}
          • © 2025 OFFICE RESERVATION •{" "}
        </Card.Title>
        <Card.Text className="my-0">Telefono : +39 0123 456 789</Card.Text>
        <Card.Text className="my-0">
          Sede operativa : Via Roma 123, Roma
        </Card.Text>
        <Card.Text className="my-0">
          Sede legale : Corso Italia 45, Roma
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-white">Since 2025</Card.Footer>
    </Container>
  );
};

export default Footer;
