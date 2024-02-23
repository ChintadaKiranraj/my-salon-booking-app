import React, { useState, useEffect } from "react";
import BookingForm from "../BookingForm";
import BookedAppointments from "../BookedAppointments";
import Header from "../Header";
import "./index.css";
function Home() {
  const [appointments, setAppointments] = useState([]);

  // Function to handle booking and save appointments to local storage
  const handleBooking = (newAppointment) => {
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    // Save appointments to local storage
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  // Effect to retrieve appointments from local storage on component mount
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments"));
    if (storedAppointments) {
      setAppointments(storedAppointments);
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="home">
      <Header />
      <BookingForm onBooking={handleBooking} />
      <BookedAppointments appointments={appointments} />
    </div>
  );
}

export default Home;
