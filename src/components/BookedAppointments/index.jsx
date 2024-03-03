import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import { RiAccountCircleLine } from "react-icons/ri";
import "reactjs-popup/dist/index.css";
import { RiDeleteBin6Fill } from "react-icons/ri";

import React from "react";

import { VscPassFilled } from "react-icons/vsc";

import "reactjs-popup/dist/index.css";
const BookedAppointments = (props) => {
  const status = {
    PENDING: "Pending",
    REJECTED: "Rejected",
    APPROVED: "Approved",
  };

  const { appointment, deleteUser, approveUser, rejectUser, accessLevele } =
    props;
  const { id } = appointment;

  const approvedBtnBg = appointment.status === status.APPROVED ? true : false;
  const rejectBtnBg = appointment.status === status.REJECTED ? true : false;

  const handleDelete = () => {
    deleteUser(id);
  };

  const handleApprove = () => {
    // toast.info("are you sure to approve this appointment?");
    approveUser(appointment);
  };

  const hadleReject = () => {
    rejectUser(appointment);
  };

  const storedAppointments = () => {
    let color = "#ffcf40";
    if (appointment.status === status.PENDING) {
      color = "#ffcf40";
    } else if (appointment.status === status.APPROVED) {
      color = "#169873";
    } else if (appointment.status === status.REJECTED) {
      color = "#ff6060";
    }

    const convertDate = (dateString) => {
      var date = new Date(dateString);
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDate = date.toLocaleString("en-US", options);
      return formattedDate;
    };

    return (
      <>
        <tr>
          <td>{appointment.name}</td>
          <td>{convertDate(appointment.time)}</td>
          <td>
            {appointment.status}

            {<VscPassFilled color={`${color}`} />}
          </td>
          {accessLevele > 0 ? (
            <td className="actionbtn">
              <button className="deleteIconBtn">
                <RiDeleteBin6Fill onClick={handleDelete} className="icon" />
              </button>

              <button
                disabled={approvedBtnBg}
                className={approvedBtnBg ? "disabled-button" : "approveBtn"}
              >
                <RiAccountCircleLine onClick={handleApprove} className="icon" />
              </button>
              <button
                disabled={rejectBtnBg}
                className={rejectBtnBg ? "disabled-button" : "rejectedBtn"}
              >
                <RiAccountCircleLine onClick={hadleReject} className="icon" />
              </button>
            </td>
          ) : (
            <ToastContainer />
          )}
        </tr>
        <ToastContainer />
      </>
    );
  };

  return <>{storedAppointments()}</>;
};

export default BookedAppointments;
