import { Navbar, Container, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
//import { logout } from "../redux/reducers/authSlice";

const TopBar = () => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  // const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Navbar className="new-dark">
      <Container
        fluid
        className="topbar-container d-flex justify-content-between align-items-center"
      >
        <button
          className="logo-btn"
          onClick={() => navigate("/")}
          type="button"
        >
          <img src={logo} alt="logo" className="logo-img" height="60" />
        </button>

        <div className="topbar-buttons">
          {/* {!isAuthenticated && ( */}
          {/* <Button
            variant="outline-light"
            className="rounded mx-2 my-1"
            onClick={() => navigate("/")}
          >
            Login / Registrati
          </Button> */}
          {/* )} */}

          {/* {isAuthenticated && user?.role === "USER" && ( */}
          <>
            <Button
              variant="outline-light"
              className="rounded mx-2 my-1"
              onClick={() => navigate("/calendar")}
            >
              Calendario
            </Button>
            <Button
              variant="outline-light"
              className="rounded mx-2 my-1"
              onClick={() => navigate("/profilo")}
            >
              Profilo
            </Button>
          </>
          {/* )} */}

          {/* {isAuthenticated && user?.role === "ADMIN" && ( */}
          <>
            <Button
              variant="outline-light"
              className="rounded mx-2 my-1"
              onClick={() => navigate("/stanze")}
            >
              Stanze
            </Button>
            <Button
              variant="outline-light"
              className="rounded mx-2 my-1"
              onClick={() => navigate("/users")}
            >
              Users
            </Button>
          </>
          <Button
            variant="danger"
            className="rounded mx-2 my-1"
            // onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
          {/* )} */}
        </div>
      </Container>
    </Navbar>
  );
};

export default TopBar;
