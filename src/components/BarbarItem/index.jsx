import React from "react";
import "./index.css";
import shopImg from "../../assets/images/nine.jpg";
const BarberItem = ({ barber }) => {
  console.log("barber:", barber);
  return (
    <li className="barber-card">
  <div>
    <img src={shopImg} className="barber-image" alt="img" />
  </div>
  <div className="barber-details">
    <p><strong>Name:</strong> {barber.firstname} {barber.lastname}</p>
    <p className="email"><strong>Email:</strong> {barber.email}</p>
    <p><strong>Contact:</strong> {barber.phonenumber}</p>
    <p><strong>Description:</strong> {barber.description}</p>
  </div>
</li>
  );
};

export default BarberItem;
