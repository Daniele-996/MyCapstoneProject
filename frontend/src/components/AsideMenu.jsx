import { Offcanvas, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Calendar3,
  Building,
  People,
  CreditCard,
  Book,
} from "react-bootstrap-icons";

const AsideMenu = ({ show, onHide }) => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role || "USER";

  const handleNavigate = (path) => {
    navigate(path);
    onHide();
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      backdrop="static"
      className="aside-menu"
    >
      <Offcanvas.Header
        closeButton
        closeVariant="white"
        className="aside-header"
      >
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="aside-body">
        <Nav className="flex-column">
          {role === "ADMIN" && (
            <>
              <Nav.Link onClick={() => handleNavigate("/calendar")}>
                <Calendar3 className="me-2" /> Calendario
              </Nav.Link>
              <Nav.Link onClick={() => handleNavigate("/rooms")}>
                <Building className="me-2" /> Stanze
              </Nav.Link>
              <Nav.Link onClick={() => handleNavigate("/users")}>
                <People className="me-2" /> Utenti
              </Nav.Link>
              <Nav.Link onClick={() => handleNavigate("/payments")}>
                <CreditCard className="me-2" /> Pagamenti
              </Nav.Link>
            </>
          )}

          {role === "USER" && (
            <>
              <Nav.Link onClick={() => handleNavigate("/calendar")}>
                <Calendar3 className="me-2" /> Calendario
              </Nav.Link>
              <Nav.Link onClick={() => handleNavigate("/my-bookings")}>
                <Book className="me-2" /> Le mie prenotazioni
              </Nav.Link>
              <Nav.Link onClick={() => handleNavigate("/my-payments")}>
                <CreditCard className="me-2" /> I miei pagamenti
              </Nav.Link>
            </>
          )}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AsideMenu;
