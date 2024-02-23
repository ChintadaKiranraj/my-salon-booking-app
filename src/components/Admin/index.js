import React, { useState, useEffect } from "react";
import BookedAppointments from "../BookedAppointments";
import Header from "../Header";
function Admin() {
  const [appointments, setAppointments] = useState([]);

  // Function to fetch appointments from local storage
  const fetchAppointments = () => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments"));
    setAppointments(storedAppointments != null ? storedAppointments : []);
  };

  // Fetch appointments from local storage when component mounts
  useEffect(() => {
    fetchAppointments();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="admin">
      <Header />
      <BookedAppointments appointments={appointments} />
    </div>
  );
}

export default Admin;
