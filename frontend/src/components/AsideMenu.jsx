import { Offcanvas, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AsideMenu = ({ show, onHide }) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const handleNavigate = (path) => {
    navigate(path);
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={onHide} backdrop="static">
      <Offcanvas.Header
        closeButton
        closeVariant="white"
        className="new-dark text-white"
      >
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="new-dark">
        <Nav className="flex-column">
          <Nav.Link onClick={() => handleNavigate("/calendar")}>
            📅 Calendario
          </Nav.Link>
          <Nav.Link onClick={() => handleNavigate("/rooms")}>
            🏢 Stanze
          </Nav.Link>
          {role === "ADMIN" && (
            <Nav.Link onClick={() => handleNavigate("/users")}>
              👥 Users
            </Nav.Link>
          )}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AsideMenu;
