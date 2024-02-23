// // BookedAppointments.js
// import React from "react";
// import "./index.css";

// function BookedAppointments({ appointments }) {
//   return (
//     <div className="booked-appointments">
//       <h2>Booked Appointments</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {appointments.map((appointment) => (
//             <tr key={appointment.id}>
//               <td>{appointment.name}</td>
//               <td>{appointment.date}</td>
//               <td>{appointment.time}</td>
//               <td>{appointment.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default BookedAppointments;
// BookedAppointments.js

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

// const BookedAppointments = (props) => {
//   const { appointments } = props;
//   const storedAppointMents = () => (
//     <div className="booked-appointments">
//       <h2>Booked Appointments</h2>
//       <table className="table">
//         <thead className="thead-dark">
//           <tr>
//             <th>Name</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {appointments.map((appointment) => (
//             <tr key={appointment.id}>
//               <td>{appointment.name}</td>
//               <td>{appointment.date}</td>
//               <td>{appointment.time}</td>
//               <td>{appointment.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   return (
//     <>
//       {appointments.length > 0 ? (
//         storedAppointMents()
//       ) : (
//         <p>No booked appointment yet.</p>
//       )}
//     </>
//   );
// };

// export default BookedAppointments;
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./index.css"; // Import custom CSS styles

const BookedAppointments = (props) => {
  const { appointments } = props;
  const storedAppointments = () => (
    <div className="booked-appointments">
      <h2 className="booked-appointmentsheader">Booked Appointments</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.name}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      {appointments.length > 0 ? (
        storedAppointments()
      ) : (
        <p>No booked appointment yet.</p>
      )}
    </>
  );
};

export default BookedAppointments;
