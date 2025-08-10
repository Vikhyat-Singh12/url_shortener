import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import useUrlStore from "./store/url.js";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const { getUrls } = useUrlStore();

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Toaster/>
    </Router>
  );
}
