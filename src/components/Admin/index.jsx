import React, { useState, useEffect } from "react";
import BookedAppointments from "../BookedAppointments";
import Header from "../Header";
import Cookie from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { Hourglass } from "react-loader-spinner";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
// import { toast } from "react-toastify";
const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [fetchedStatus, setFetchedStatus] = useState(false);
  const [accessLevele, setAccessLevel] = useState(0);
  const APPROVED = "Approved";
  const REJECTED = "Rejected";
  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:4001/fetch-booking-details"
      );
      const jsonData = await response.json();
      console.log("Data  --> " + jsonData);
      const decodedString = atob(jsonData.data);
      console.log(decodedString);
      setAppointments(JSON.parse(decodedString));
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

  const deleteUser = async (userId) => {
    const URL = "http://localhost:4001/detele-booking-users";
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });

    let result = await response.json();
    console.log(result);
    if (result.status === true) {
      setFetchedStatus(true);
      toast.success("User appointment deleted successfully!");
      fetchAppointments();
    } else {
      toast.error("Failed to delete user appoint ment!");
    }
  };
  const updateStatusRejectApprove = async (userId, status) => {
    const url = "http://localhost:4001/update-booking-details";

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, status }),
    });

    let result = await response.json();

    if (result.status === true) {
      setFetchedStatus(true);
      toast.success("User appointment " + status + " successfully!");
      fetchAppointments();
    } else {
      toast.error("Failed to update status User appointment!");
    }
  };

  const approveUser = (userId) => {
    updateStatusRejectApprove(userId, APPROVED);
  };
  const rejectUser = (userId) => {
    updateStatusRejectApprove(userId, REJECTED);
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
              {accessLevele > 0 && <th>{accessLevele > 0 ? "Actions" : ""}</th>}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <BookedAppointments
                appointment={appointment}
                key={appointment.id}
                deleteUserVar={deleteUser}
                approveUserVar={approveUser}
                rejectUserVar={rejectUser}
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
      <Header />
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
          renderBoockedAppointments()
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Admin;
