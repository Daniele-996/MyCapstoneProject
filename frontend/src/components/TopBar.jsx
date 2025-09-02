import { Navbar, Container, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar className="new-dark">
      <Container
        fluid
        className="d-flex flex-column flex-md-row justify-content-between align-items-center topbar-container"
      >
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <button
            className="logo-btn"
            onClick={() => navigate("/")}
            aria-label="Vai alla home"
            type="button"
          >
            <img src={logo} alt="logo" className="logo-img" height="60" />
          </button>
        </div>
        <div className="topbar-buttons">
          <Button variant="outline-light" className="rounded mx-2 my-1">
            Calendario
          </Button>
          <Button variant="outline-light" className="rounded mx-2 my-1">
            Profilo
          </Button>
          <Button variant="outline-light" className="rounded mx-2 my-1">
            Stanze
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default TopBar;
