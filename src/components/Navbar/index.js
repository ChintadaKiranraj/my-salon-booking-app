import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <nav className="navbar1">
      <h1 className="salon_title">Salon Appointment Booking</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
