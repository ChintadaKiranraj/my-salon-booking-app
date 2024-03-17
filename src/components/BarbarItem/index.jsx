import React from "react";
import "./index.css";

const BarberItem = ({ barber }) => {
  console.log("barber:", barber);
  return (
    <li className="barber-card">
      <img src={barber.profilephoto} className="image" alt="img" />
      <p>Name:{barber.firstname}</p>
      <p>Email:{barber.email}</p>
      <p>Contact:{barber.phonenumber}</p>
    </li>
  );
};

export default BarberItem;
