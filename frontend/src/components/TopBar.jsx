import { Navbar, Container, Button, Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/actions";

const TopBar = ({ toggleAside }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  return (
    <Navbar className="new-dark">
      <Container
        fluid
        className="p-0 d-flex justify-content-between align-items-center"
      >
        <Button
          className="logo-btn"
          onClick={() => navigate("/")}
          type="button"
        >
          <Image src={logo} alt="logo" className="logo-img" height="60" />
        </Button>

        <div className="topbar-buttons">
          {!token ? (
            <>
              <Button
                variant="outline-light"
                className="rounded mx-2 my-1"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="outline-light"
                className="rounded mx-2 my-1"
                onClick={() => navigate("/register")}
              >
                Registrati
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-light"
                className="rounded mx-2 my-1"
                onClick={toggleAside}
              >
                ☰
              </Button>
              <Button
                variant="danger"
                className="rounded mx-2 my-1"
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default TopBar;
