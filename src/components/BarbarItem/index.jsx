import React from "react";
import "./index.css";

const BarberItem = ({ barber }) => {
  return (
    <li className="barber-card">
      <img src={barber.image} className="image" alt="img" />
      <p>Name:{barber.firstName}</p>
      <p>Email:{barber.email}</p>
      <p>Contact:{barber.phone}</p>
    </li>
  );
};

export default BarberItem;
