import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
