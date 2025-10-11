import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import BackBtn from "./BackBtn";
import { useRef } from "react";
import { updateUserAvatar } from "../redux/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <h3>⚠ Nessun utente loggato</h3>
      </Container>
    );
  }

  const handleAvatarClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Il file è troppo grande! Max 2MB.");
        return;
      }
      dispatch(updateUserAvatar(user.id, file));
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow new-dark text-light rounded-3">
            <div className="d-flex align-items-center mb-4">
              <Image
                src={user.avatarUrl}
                roundedCircle
                height="100"
                width="100"
                className="me-3 border border-3 border-light"
                onClick={handleAvatarClick}
                style={{ cursor: "pointer", objectFit: "cover" }}
              />
              <Form.Control
                type="file"
                accept="image/*"
                ref={fileInput}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div>
                <h4>
                  {user.firstName} {user.lastName}
                </h4>
                <span className="badge bg-info text-dark">{user.role}</span>
              </div>
            </div>

            <Card.Body>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>Email:</strong>
                </Col>
                <Col sm={8}>{user.email}</Col>
              </Row>
              <Row className="mb-3">
                <Col sm={4}>
                  <strong>Telefono:</strong>
                </Col>
                <Col sm={8}>{user.phone}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Row className="mt-3">
          <Col className="d-flex justify-content-center">
            <BackBtn />
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Profile;
