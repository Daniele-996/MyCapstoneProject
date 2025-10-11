import { Navbar, Container, Button, Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/actions";

const TopBar = ({ toggleAside }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Navbar className="new-dark">
      <Container fluid className="topbar-container">
        <div className="topbar-logo">
          <Button
            className="logo-btn"
            onClick={() => navigate("/profile")}
            type="button"
          >
            <Image src={logo} alt="logo" className="logo-img" height="60" />
          </Button>
        </div>

        <div className="topbar-buttons d-flex align-items-center gap-2">
          {!token ? (
            <>
              <Button
                variant="outline-light"
                className="rounded"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="outline-light"
                className="rounded"
                onClick={() => navigate("/register")}
              >
                Registrati
              </Button>
            </>
          ) : (
            <>
              {user && (
                <div className="d-flex align-items-center me-2">
                  <Image
                    src={user.avatarUrl}
                    roundedCircle
                    height="32"
                    width="32"
                    style={{ objectFit: "cover", cursor: "pointer" }}
                    className="me-2 border border-light"
                    onClick={() => navigate("/")}
                  />
                  <span className="text-light me-2">
                    {user.firstName}, Welcome!!
                  </span>
                </div>
              )}
              <Button
                variant="outline-light"
                className="rounded"
                onClick={toggleAside}
              >
                ☰
              </Button>
              <Button
                variant="danger"
                className="rounded"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
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
