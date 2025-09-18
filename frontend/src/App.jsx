import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Room from "./components/Room";
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
import Calendar from "./components/Calendar";
// import Payments from "./components/Payments";
// import Reservations from "./components/Reservations";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

const App = () => {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  return (
    <Router>
      <TopBar />
      <Container className="main-content">
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/rooms" /> : <FormLogin />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/rooms" /> : <FormRegister />}
          />
          <Route
            path="/rooms"
            element={token ? <Room /> : <Navigate to="/login" />}
          />
          <Route
            path="/calendar"
            element={token ? <Calendar /> : <Navigate to="/login" />}
          />
          {/* <Route path="/payments" element={token ? <Payments /> : <Navigate to="/login" />} />
              <Route path="/reservations" element={token ? <Reservations /> : <Navigate to="/login" />} /> */}
          {role === "ADMIN" && (
            <>
              <Route
                path="/users"
                element={<div>Gestione utenti (solo admin)</div>}
              />
              <Route path="/stanze" element={<Room />} />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to={token ? "/rooms" : "/login"} />}
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
