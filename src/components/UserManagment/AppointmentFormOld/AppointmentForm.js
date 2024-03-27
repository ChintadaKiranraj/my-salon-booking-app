// import React, { useState } from "react";
// import axios from 'axios';
// import "./AppointmentForm.css";

// // import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer ,toast} from "react-toastify";
// const BookingForm = ({ onBooking }) => {
//   const PENDING = "Pending";
//   const [appointMentData, setAppointMentData] = useState({
//     name: "",
//     dateAndtime: "",
//     status: PENDING,
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     dateAndtime: "",
//   });

//   const convertDateFormate = (dateFromUI) => {
//     const modifiedDateFormate = dateFromUI.replace("T", "T") + ":00";
//     return modifiedDateFormate;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.log(value);
//     setAppointMentData({
//       ...appointMentData,
//       [name]: value,
//     });

//     setErrors({
//       ...errors,
//       [name]: value.trim() === "" ? `*${name} is required` : "",
//     });
//     if (e.target.type === "datetime-local") {
//       const currentDate = new Date().toISOString().split("T")[0];
//       if (value < currentDate) {
//         setErrors((prevError) => ({
//           ...prevError,
//           dateAndtime: "Please select a present or future date and time",
//         }));
//       } else {
//       }
//     }
//   };

//   const onBookAppointment = (event) => {
//     event.preventDefault();

//     let formIsValid = true;
//     const newErrors = { ...errors };
//     Object.keys(appointMentData).forEach((fieldName) => {
//       if (appointMentData[fieldName].trim() === "") {
//         newErrors[fieldName] = `*${fieldName} is required`;
//         formIsValid = false;
//       } else {
//         newErrors[fieldName] = "";
//       }
//     });

//     setErrors(newErrors);

//     if (formIsValid) {
//       // If validation passes, submit the form or dispatch an action
//       let databaseDate = convertDateFormate(appointMentData.dateAndtime);

//       console.log(databaseDate);
//       let newModifieedAppointment = {
//         ...appointMentData,
//         dateAndtime: databaseDate,
//       };

//       onBooking(newModifieedAppointment);
//       setAppointMentData({
//         name: "",
//         dateAndtime: "",
//       });
//     }
//   };

//   return (
//     <div className="book-an-appointment">
//       <h2 className="form-title">Book Appointment</h2>
//       <form onSubmit={onBookAppointment} className="form">
//         <div className="form-group">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={appointMentData.name}
//             onChange={handleChange}
//           />
//           <span style={{ color: "red" }}>{errors.name}</span>
//         </div>
//         <div className="form-group">
//           <label htmlFor="datetime-local">Date&Time:</label>
//           <input
//             type="datetime-local"
//             id="datetime-local"
//             name="dateAndtime"
//             value={appointMentData.dateAndtime}
//             onChange={handleChange}
//           />
//           <span style={{ color: "red" }}>{errors.dateAndtime}</span>
//         </div>

//         <button
//           type="submit"
//           className="submit-btn"
//           disabled={Object.values(errors).some((error) => error !== "")}
//         >
//           Book
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default BookingForm;
