import React from "react";

import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import ContactForm from "./pages/ContactForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Signup from "./components/Singup";
import Login from "./components/Login";
function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {user && <Route path="/" element={<Home />} />}
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contactform" element={<ContactForm/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
