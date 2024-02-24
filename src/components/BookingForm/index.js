import React, { useState } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid"; // Importing UUID generator
import { toast } from "react-toastify"; // Importing toast function
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const BookingForm = ({ onBooking }) => {
  const PENDING = "Pending",
    REJECTED = "Rejected",
    APPROVED = "Approved";
  const [name, setName] = useState("");
  // const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const convertDateFormate = (dateFromUI) => {
    const modifiedDateFormate = dateFromUI.replace("T", "T") + ":00";

    console.log("modifiedDateFormate  --->" + modifiedDateFormate);

    return modifiedDateFormate;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      name,
      time,
      status: PENDING,
    };
    console.log("newAppointment--> " + newAppointment.time);

    let databaseDate = convertDateFormate(newAppointment.time);
    let newModifieedAppointment = { ...newAppointment, time: databaseDate };
    console.log("databaseDate --->" + databaseDate);
    onBooking(newModifieedAppointment);
    // setName("");
    // setDate("");
    // setTime("");
    // toast.success("Booking  was successfully done!");
    toast.success("Registration was successfully done!", {
      autoClose: 3000, // Close the pop-up after 3000 milliseconds (3 seconds)
      closeOnClick: true, // Allow the user to manually close the pop-up by clicking on it
    });
  };

  // Function to handle date change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format
    console.log("selectedDate   " + selectedDate);
    // Check if selected date is not a previous date
    if (selectedDate >= currentDate) {
      setTime(selectedDate);
      // console.log("selectedDate2   " + selectedDate);
    } else {
      alert("Please select present or future date.");
      // toast.error("Please select present or future date.", {
      //   autoClose: 100000000, // Close the pop-up after 3000 milliseconds (3 seconds)
      //   closeOnClick: true, // Allow the user to manually close the pop-up by clicking on it
      // });
      return;
      // Optionally, you can clear the date field if you want
      // setDate("");
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
            onChange={handleDateChange} // Handle date change
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
