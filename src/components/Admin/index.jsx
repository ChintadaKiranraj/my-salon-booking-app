import React, { useState, useEffect } from "react";
import BookedAppointments from "../BookedAppointments";
import Header from "../Header";
import Cookie from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { Hourglass } from "react-loader-spinner";
import "./index.css";
const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [fetchedStatus, setFetchedStatus] = useState(false);
  const [accessLevele, setAccessLevel] = useState(0);
  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:4001/fetch-booking-details"
      );
      const data = await response.text();
      const decodedString = atob(data);
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

  const deleteUser = (userId) => {
    const deleteAppointMent = async () => {
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
        alert("User appointment deleted successfully!");
      } else {
        alert("Failed to delete user appoint ment!");
      }
    };

    deleteAppointMent();
    fetchAppointments();
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
      alert("User appointment updated successfully!");
      window.location.reload();
    } else {
      alert("Failed to update status User appointment!");
      window.location.reload();
    }
  };

  const approveUser = (userId) => {
    updateStatusRejectApprove(userId, "Approved");
    fetchAppointments();
  };
  const rejectUser = (userId) => {
    updateStatusRejectApprove(userId, "Rejected");
    fetchAppointments();
  };
  const renderBoockedAppointments = () => (
    <div className="booked-appointments">
      <h2 className="booked-appointments-title">Booked Appointments</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Status</th>
            <th>{accessLevele > 0 ? "Actions" : ""}</th>
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
  );

  return (
    <div className="admins">
      <Header />
      {!fetchedStatus ? (
        <div className="admin">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
          <h3>Loading...</h3>
        </div>
      ) : (
        renderBoockedAppointments()
      )}
    </div>
  );
};

export default Admin;
