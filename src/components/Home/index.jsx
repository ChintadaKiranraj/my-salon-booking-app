// import React, { useState, useEffect } from "react";
import BookingForm from "../BookingForm";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import BookedAppointments from "../BookedAppointments";
import Header from "../Header";
import "./index.css";
const Home = () => {
  const handleBooking = async (newAppointment) => {
    try {
      const response = await fetch(
        "http://localhost:4001/save-booking-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newAppointment,
            time: newAppointment.dateAndtime,
            date: "2024-02-22",
          }),
        }
      );

      if (response.ok) {
        const jsonString = await response.json();
        if (jsonString.status) {
          toast.success("Successfully saved your appointment!");
        }
      } else {
        toast.error(
          "Unable to store appointment details......! Try again later"
        );
      }
    } catch (error) {
      toast.error("An error occurred while saving booking details");
    }
  };

  return (
    <div className="home">
      <Header />
      <BookingForm onBooking={handleBooking} />
      <ToastContainer />
      {/* <BookedAppointments appointments={appointments} /> */}
    </div>
  );
};

export default Home;
