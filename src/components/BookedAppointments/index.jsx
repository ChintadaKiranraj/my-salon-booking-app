// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
// import { ToastContainer, toast } from "react-toastify";
// import { RiAccountCircleLine } from "react-icons/ri";
// import "reactjs-popup/dist/index.css";
// import { RiDeleteBin6Fill } from "react-icons/ri";
// import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
// import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
// import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

// import React from "react";

// import { VscPassFilled } from "react-icons/vsc";

// import "reactjs-popup/dist/index.css";
// const BookedAppointments = (props) => {
//   const status = {
//     PENDING: "Pending",
//     REJECTED: "Rejected",
//     APPROVED: "Approved",
//   };

//   const { appointment, deleteUser, approveUser, rejectUser, accessLevele } =
//     props;
//   const { id } = appointment;

//   const approvedBtnBg = appointment.status === status.APPROVED ? true : false;
//   const rejectBtnBg = appointment.status === status.REJECTED ? true : false;

//   const handleDelete = () => {
//     deleteUser(id);
//   };

//   const handleApprove = () => {
//     // toast.info("are you sure to approve this appointment?");
//     approveUser(appointment);
//   };

//   const hadleReject = () => {
//     rejectUser(appointment);
//   };

//   const storedAppointments = () => {
//     let color = "#ffd700";
//     // if (appointment.status === status.PENDING) {
//     //   color = "#009eff";
//     // } else
//     if (appointment.status === status.APPROVED) {
//       color = "#0a642c";
//     } else if (appointment.status === status.REJECTED) {
//       color = "red";
//     }

//     const convertDate = (dateString) => {
//       var date = new Date(dateString);
//       const options = {
//         month: "long",
//         day: "numeric",
//         year: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       };
//       const formattedDate = date.toLocaleString("en-US", options);
//       return formattedDate;
//     };

//     return (
//       <>
//         <tr>
//           <td>{appointment.name}</td>
//           <td>{convertDate(appointment.time)}</td>
//           <td>
//             {appointment.status}

//             {<VscPassFilled color={`${color}`} />}
//           </td>
//           {accessLevele > 0 ? (
//             <td className="actionbtn">
//               <button className="deleteIconBtn">
//                 <DeleteSharpIcon onClick={handleDelete} className="icon" />
//               </button>

//               <button
//                 disabled={approvedBtnBg}
//                 className={approvedBtnBg ? "disabled-button" : "approveBtn"}
//               >
//                 <CheckRoundedIcon onClick={handleApprove} className="icon" />
//               </button>
//               <button
//                 disabled={rejectBtnBg}
//                 className={rejectBtnBg ? "disabled-button" : "rejectedBtn"}
//               >
//                 <ClearRoundedIcon onClick={hadleReject} className="icon" />
//               </button>
//             </td>
//           ) : (
//             <ToastContainer />
//           )}
//         </tr>
//         <ToastContainer />
//       </>
//     );
//   };

//   return <>{storedAppointments()}</>;
// };

// export default BookedAppointments;
