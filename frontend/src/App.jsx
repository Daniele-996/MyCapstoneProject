import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import Calendar from "./components/Calendar";
import Room from "./components/Room";
import Profile from "./components/Profile";
import User from "./components/User";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="app-container">
        <TopBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/stanze" element={<Room />} />
            <Route path="/profilo" element={<Profile />} />
            <Route path="/users" element={<User />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
