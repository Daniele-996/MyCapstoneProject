import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import TopBar from "./components/TopBar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Calendar />} />
        {/* altre route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
