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

const App = () => {
  const token = useSelector((s) => s.auth.token);
  const role = useSelector((s) => s.auth.role);
  const [showAside, setShowAside] = useState(false);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <TopBar toggleAside={() => setShowAside(true)} />
        <Container fluid className="flex-grow-1 d-flex p-0">
          <Row className="flex-grow-1 d-flex align-items-stretch w-100 m-0">
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
                <Route path="/login" element={<FormLogin />} />
                <Route path="/register" element={<FormRegister />} />
                <Route
                  path="/dashboard"
                  element={token ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/rooms"
                  element={token ? <Room /> : <Navigate to="/login" />}
                />
                {role === "ADMIN" && (
                  <Route
                    path="/users"
                    element={<div>Gestione utenti (solo admin)</div>}
                  />
                )}
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
