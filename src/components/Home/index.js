import React, { useState, useEffect } from "react";
import BookingForm from "../BookingForm";
import { toast } from "react-toastify";
// import BookedAppointments from "../BookedAppointments";
import Header from "../Header";
import "./index.css";
const Home = () => {
  const [appointments, setAppointments] = useState([]);

  const saveBookingDetails = async (newAppointment) => {
    try {
      const response = await fetch(
        "http://localhost:4001/save-booking-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAppointment),
        }
      );
      // console.log("response--->" + response.json());

      if (!response.json().status === true) {
        throw new Error("Failed to save booking details");
      } else {
        toast.success("Your slot was successfully boocked in side Home!", {
          autoClose: 3000,
          closeOnClick: true,
        });
      }
      // If successful, fetch all data from the table
      const allDataResponse = await fetch(
        "http://localhost:4001/fetch-booking-details"
      );
      if (!allDataResponse.ok) {
        throw new Error("Failed to fetch all booking details");
      }
      const allData = await allDataResponse.json();
      setAppointments(allData);
    } catch (error) {
      console.error(error);
    }
  };
  // Function to handle booking and save appointments to local storage
  const handleBooking = (newAppointment) => {
    saveBookingDetails(newAppointment);
  };

  //calls on component mount
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments"));
    if (storedAppointments) {
      setAppointments(storedAppointments);
    }
  }, []);

  return (
    <div className="home">
      <Header />
      <BookingForm onBooking={handleBooking} />
      {/* <BookedAppointments appointments={appointments} /> */}
    </div>
  );
};

export default Home;
