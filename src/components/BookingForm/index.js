import React, { useState } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid"; // Importing UUID generator

const BookingForm = ({ onBooking }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: uuidv4(), // Generate UUID for unique ID
      name,
      date,
      time,
      status: "Pending", // Set default status to "Pending"
    };
    onBooking(newAppointment);
    // setName("");
    // setDate("");
    // setTime("");
  };

  // Function to handle date change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format

    // Check if selected date is not a previous date
    if (selectedDate >= currentDate) {
      setDate(selectedDate);
    } else {
      alert("Please select present or future date.");
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
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange} // Handle date change
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

// import React, { useState } from "react";
// import "./index.css";
// import { v4 as uuidv4 } from "uuid"; // Importing UUID generator

// const BookingForm = ({ onBooking }) => {
//   const [name, setName] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newAppointment = {
//       id: uuidv4(), // Generate UUID for unique ID
//       name,
//       date,
//       time,
//       status: "Pending", // Set default status to "Pending"
//     };
//     onBooking(newAppointment);
//     // setName("");
//     // setDate("");
//     // setTime("");
//   };

//   return (
//     <div className="booking-form-container">
//       <h2 className="form-title">Book Appointment</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="date">Date:</label>
//           <input
//             type="date"
//             id="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="time">Time:</label>
//           <input
//             type="time"
//             id="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-btn">
//           Book
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;
