import React, { useState, useEffect } from "react";
import BookedAppointments from "../BookedAppointments";
import Header from "../Header/header";
import Cookie from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { Hourglass } from "react-loader-spinner";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const Admin = () => {
  const token = Cookie.get("jwt_token");
  const accessLevel = parseInt(Cookie.get("access_level"));
  const loginUser = Cookie.get("email_id");
  const [appointments, setAppointments] = useState([]);
  const [fetchedStatus, setFetchedStatus] = useState(false);
  const [accessLevele, setAccessLevel] = useState(0);
  const APPROVED = "Approved";
  const REJECTED = "Rejected";

  const fetchAppointments = async () => {
    let URL = "http://localhost:4001/fetch-booking-details";
    try {
      const response = await fetch(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      let filteredData = [];
      if (accessLevel === 0 || accessLevel === 1 || accessLevel === 2) {
        filteredData = jsonData.data.filter((item) => {
          return item.regEmialId === loginUser;
        });
      }
      if (accessLevel === 3) {
        filteredData = jsonData.data;
      }

      setAppointments(filteredData);
      setFetchedStatus(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getAccesLevel = () => {
    const accessLevel = Cookie.get("access_level");
    setAccessLevel(accessLevel);
  };
  useEffect(() => {
    getAccesLevel();
    fetchAppointments();
  }, []);

  const onDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      const URL = "http://localhost:4001/remove-booking-details";
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });
      if (response.ok === true) {
        let result = await response.json();
        if (result.status === true) {
          setFetchedStatus(true);
          fetchAppointments();
          // return toast.success("User appointment deleted successfully!");
          alert("User appointment deleted successfully!");
        }
      } else {
        // toast.error("Failed to delete user appoint ment!");
        alert("Failed to delete user appoint ment!");
      }
    }
  };
  const updateStatusRejectApprove = async (appointment, status) => {
    console.log("Approval  reject" + appointment);
    const updateStatus = window.confirm(
      "Are you sure you want to update the status?"
    );

    if (updateStatus) {
      const url = "http://localhost:4001/update-booking-details-byid";

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...appointment, status }),
      });
      if (response.ok === true) {
        let result = await response.json();
        if (result.status === true) {
          setFetchedStatus(true);
          fetchAppointments();
          // return toast.success("User appointment " + status + " successfully!");
          alert("User appointment " + status + " successfully!");
        }
      } else {
        // return toast.error("Failed to update status User appointment!");
        alert("Failed to update status User appointment!");
      }
    }
  };

  const onApprove = (appointment) => {
    updateStatusRejectApprove(appointment, APPROVED);
  };
  const onReject = (appointment) => {
    updateStatusRejectApprove(appointment, REJECTED);
  };
  const renderBoockedAppointments = () => (
    <>
      <h2 className="booked-appointments-title">Bookings Details :</h2>
      <div className="table-container">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Status</th>
              {accessLevele > 1 && <th>{accessLevele > 1 ? "Actions" : ""}</th>}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <BookedAppointments
                appointment={appointment}
                key={appointment.id}
                deleteUser={onDelete}
                approveUser={onApprove}
                rejectUser={onReject}
                accessLevele={accessLevele}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <>
      {/* <Header /> */}
      <div className="boocked-table-content">
        {!fetchedStatus ? (
          <div className="loading-spinner">
            <Hourglass
              visible={true}
              height="35"
              width="35"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {renderBoockedAppointments()}
            <ToastContainer />
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
