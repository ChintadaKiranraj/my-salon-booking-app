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
      setAppointments(JSON.parse(decodedString));
      setFetchedStatus(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const fetchAppointments2 = () => {
  //   axiso.get("http://localhost:4001/fetch-booking-details").then((res) => {
  //     console.log(res.data);
  //   });
  // };

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
        // toast.success("Successfully saved your appointment!");

        toast.success("User appointment deleted successfully!");
      } else {
        toast.error("Failed to delete user appoint ment!");
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
      toast.success("User appointment updated successfully!");
      window.location.reload();
    } else {
      toast.error("Failed to update status User appointment!");
      window.location.reload();
    }
  };

  const approveUser = (userId) => {
    updateStatusRejectApprove(userId, APPROVED);
    fetchAppointments();
  };
  const rejectUser = (userId) => {
    updateStatusRejectApprove(userId, REJECTED);
    fetchAppointments();
  };
  const renderBoockedAppointments = () => (
    <div className="booked-appointments">
      <h2 className="booked-appointments-title">Booked Appointments</h2>
      <div className="table-container">
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
          <p>Loading...</p>
        </div>
      ) : (
        renderBoockedAppointments()
      )}
      <ToastContainer />
    </div>
  );
};

export default Admin;
