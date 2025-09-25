import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import Room from "./components/Room";
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { Col, Container, Row } from "react-bootstrap";
import AsideMenu from "./components/AsideMenu";
import { useState } from "react";
import Users from "./components/Users";
import UserPayments from "./components/UserPayments";
import UserReservations from "./components/UserReservations";
import Profile from "./components/Profile";
import AllPayments from "./components/AllPayments";

const App = () => {
  const token = useSelector((s) => s.auth.token);
  const [showAside, setShowAside] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <TopBar toggleAside={() => setShowAside(true)} />
        <Container fluid className="content p-0">
          <Row className="flex-grow-1 w-100 m-0">
            <Col md={3} lg={3} className="d-none d-md-block p-0">
              {token && (
                <AsideMenu
                  show={showAside}
                  onHide={() => setShowAside(false)}
                />
              )}
            </Col>
            <Col
              xs={12}
              md={showAside ? 9 : 12}
              className="p-3 d-flex flex-column"
            >
              <Routes>
                <Route
                  path="/login"
                  element={token ? <Navigate to="/dashboard" /> : <FormLogin />}
                />
                <Route
                  path="/register"
                  element={
                    token ? <Navigate to="/dashboard" /> : <FormRegister />
                  }
                />
                <Route
                  path="/"
                  element={token ? <Profile /> : <Navigate to="/login" />}
                />
                <Route
                  path="/payments"
                  element={token ? <AllPayments /> : <Navigate to="/login" />}
                />
                <Route
                  path="/users"
                  element={token ? <Users /> : <Navigate to="/login" />}
                />
                <Route
                  path="/users/:id/payments"
                  element={token ? <UserPayments /> : <Navigate to="/login" />}
                />
                <Route
                  path="/users/:id/reservations"
                  element={
                    token ? <UserReservations /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/dashboard"
                  element={token ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/rooms"
                  element={token ? <Room /> : <Navigate to="/login" />}
                />
                <Route
                  path="*"
                  element={<Navigate to={token ? "/dashboard" : "/login"} />}
                />
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
