import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import Room from "./components/Room";
import Profile from "./components/Profile";
import User from "./components/User";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/index.css";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Container fluid className="app-container content">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/stanze" element={<Room />} />
            <Route path="/profilo" element={<Profile />} />
            <Route path="/users" element={<User />} />
          </Routes>
        </Container>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
