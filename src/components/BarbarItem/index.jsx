import React from "react";
import "./index.css";

const BarberItem = ({ barber }) => {
  return (
    <li className="barbar-item">
      <div className="name-email-contact">
        <p>Name:{barber.firstName}</p>
        <p>Email:{barber.email}</p>
        <p>Contact:{barber.phone}</p>
      </div>
      <img src={barber.image} className="image" alt="img" />
    </li>
  );
};

export default BarberItem;
