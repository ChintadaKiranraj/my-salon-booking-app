// import React, { useState, useEffect } from "react";
import BookingForm from "../BookingForm";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import BookedAppointments from "../BookedAppointments";
import ViewOnly from "../Viewonly";
import Header from "../Header/header";
import "./index.css";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

const Home = () => {
  const [addedNewData, setNewDataStatus] = useState(true);
  useEffect(() => {
    console.log("re render");
  }, [addedNewData]);

  const handleBooking = async (newAppointment) => {
    try {
      const response = await fetch(
        "http://localhost:4001/save-booking-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("jwt_token")}`,
          },
          body: JSON.stringify({
            ...newAppointment,
            time: newAppointment.dateAndtime,
            regEmialId: Cookie.get("email_id"),
          }),
        }
      );
      debugger;
      if (response.ok) {
        const jsonString = await response.json();
        if (jsonString.status) {
          setNewDataStatus(!addedNewData);
          toast.success("Successfully saved your appointment!");
          window.location.reload();
        }
      } else {
        toast.error(
          "Unable to store appointment details......! Try again later"
        );
      }
    } catch (error) {
      toast.error("An error occurred while saving booking details");
    }
  };

  return (
    <div className="page-container">
      {/* <Header /> */}
      <div className="booking-detaisls-viwonly-form-table">
        <BookingForm onBooking={handleBooking} />
        <div className="content">
          <ViewOnly />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
