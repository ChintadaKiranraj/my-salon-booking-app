import React, { useState } from "react";
import "./index.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const BookingForm = ({ onBooking }) => {
  const PENDING = "Pending";

  const [name, setName] = useState("");

  const [time, setTime] = useState("");
  const convertDateFormate = (dateFromUI) => {
    const modifiedDateFormate = dateFromUI.replace("T", "T") + ":00";

    return modifiedDateFormate;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      name,
      time,
      status: PENDING,
    };

    let databaseDate = convertDateFormate(newAppointment.time);
    let newModifieedAppointment = { ...newAppointment, time: databaseDate };

    onBooking(newModifieedAppointment);

    setName("");
    setTime("");
    toast.success("Your slot was successfully boocked!", {
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  // Function to handle date change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0];

    // Check if selected date is not a previous date
    if (selectedDate >= currentDate) {
      setTime(selectedDate);
    } else {
      alert("Please select present or future date.");
      return;
    }
  };

  return (
    <div className="booking-form-container">
      <h2 className="form-title">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="datetime-local">Date&Time:</label>
          <input
            type="datetime-local"
            id="datetime-local"
            value={time}
            onChange={handleDateChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Book
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default BookingForm;
