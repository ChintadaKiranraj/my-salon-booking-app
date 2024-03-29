import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Appointment.css";
import "react-datepicker/dist/react-datepicker.css";
import { getUserDetails } from "../../Utilities/Utilities";

const AppointmentForm = () => {
  const [salonShopsList, setSalonShopsList] = useState([]);
  const [salonServices, setSalonServices] = useState([]);
  const [shopsLocations, setShopsLocations] = useState([]);
  const [shopIdOwnerId, setShopIdOwnerId] = useState({
    shopId: "",
    ownerId: "",
  });
  const fetchAllLocation = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/shops-locations");
      const shopsFromServer = await response.json();
      setShopsLocations(shopsFromServer.data);
      console.log(shopsFromServer.data);
    } catch (e) {
      debugger;
      toast.error(e);
      toast.error("Error in fetching locations", e);
    }
  };
  useEffect(() => {
    fetchAllLocation();
    salonServicess();
  }, []);

  const [salonBookingData, setSalonBookingData] = useState({
    datetime: "",
    status: "pending",
    saloonService: "",
    shopName: "",

    location: "",
  });
  const [errors, setErrors] = useState({
    datetime: "",
    status: "pending",
    saloonService: "",
    shopName: "",

    location: "",
  });
  const fetchShopNamesByLocation = async (location) => {
    console.log("location", location);

    try {
      const response = await fetch(
        `http://localhost:4001/api/shopname-by-location/${location}`
      );
      const responseData = await response.json();
      setSalonShopsList(responseData.data);
      console.log("fetchShopNamesByLocation");

      console.log(responseData.data);
    } catch (e) {
      toast.error(e);

      if (e.message === "Network error") {
        toast.error(
          "Network error occurred. Please check your internet connection."
        );
      } else {
        toast.error(
          "Error in fetching shop names by location. Please try again later."
        );
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSalonBookingData({
      ...salonBookingData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value.trim() === "" ? `*${name} is required` : "",
    });
    if (name === "location" && value.trim() !== "") {
      console.log("fetching shop names based on the selected location");
      fetchShopNamesByLocation(value);
    }
    if (name === "shopName" && value.trim() !== "") {
      console.log("selected shop value -<", value);
      salonShopsList.some((shop) => {
        if (shop.shopname === value) {
          setShopIdOwnerId({ shopId: shop.shopid, ownerId: shop.ownerid });
        }
      });
    }
  };

  const bookAnAppointment = async (appointmentData) => {
   
    const userId = getUserDetails().userid;
    const { shopId, ownerId } = shopIdOwnerId;
    console.log("appointmentData", appointmentData);
  

    try {
      const response = await fetch(
        `http://localhost:4001/api/saloon-booking/${userId}/${shopId}/${ownerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );
      const JsonData = await response.json();
      console.log("data", JsonData);

      if (JsonData.status === true && JsonData.code === 200) {
        toast.success(JsonData.message);
        return;
      }
    } catch (exception) {
      toast.error("Error in booking appointment", exception);
    }
  };

  const onSubmitSaloonBooking = (event) => {
    event.preventDefault();
    let formIsValid = true;
    debugger;
    const newErrors = { ...errors };
    console.log("salonBookingData ====>   ", salonBookingData);
    Object.keys(salonBookingData).forEach((fieldName) => {
      console.log("fieldName", fieldName);
      let value = salonBookingData[fieldName];
      if (value.trim() === "") {
        newErrors[fieldName] = `*${fieldName} is required`;
        formIsValid = false;
      }
    });
    setErrors(newErrors);
    if (formIsValid) {
      console.log("salonBookingData", salonBookingData);

      bookAnAppointment(salonBookingData);
    }
  };
  const salonServicess = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/salonServicess");
      const responseJson = await response.json();

      if (responseJson.code === 200) {
        setSalonServices(responseJson.data);
      }
    } catch (e) {
      toast.error("Error in fetching locations", e);
    }
  };
  return (
    <div>
      <h2 className="booking-form-title">Book Your Beauty Appointment</h2>
      <form onSubmit={onSubmitSaloonBooking} className="appoin-form">
        <label>Appointment Date & Time*:</label>
        <input
          className="input-field"
          type="datetime-local"
          name="datetime"
          value={salonBookingData.datetime}
          placeholder="Select a date and time"
          onChange={handleChange}
        />

        <span style={{ color: "red" }}>{errors.datetime}</span>
        <br />
        <label>Select Location*:</label>

        <select
          className="input-field"
          value={salonBookingData.location}
          onChange={handleChange}
          name="location"
        >
          <option value="" disabled>
            Choose a location
          </option>
          {shopsLocations.map((service, index) => (
            <option key={index} value={service.location}>
              {service.location}
            </option>
          ))}
        </select>
        <span style={{ color: "red" }}>{errors.location}</span>
        <br />
        <label>Select Salon Shop*:</label>

        <select
          className="input-field"
          value={salonBookingData.shopName}
          onChange={handleChange}
          name="shopName"
        >
          <option value="" disabled>
            Choose a salon shop
          </option>
          {salonShopsList.map((service, index) => (
            <option key={index} value={service.shopname}>
              {service.shopname}
            </option>
          ))}
        </select>
        <span style={{ color: "red" }}>{errors.shopName}</span>
        <br />

        <label>Select Salon Service*:</label>
        <select
          className="input-field"
          value={salonBookingData.saloonService}
          onChange={handleChange}
          name="saloonService"
        >
          <option value="" disabled>
            Choose a salon service
          </option>
          {salonServices.map((service, index) => (
            <option key={index} value={service.servicename}>
              {service.servicename}
            </option>
          ))}
        </select>
        <span style={{ color: "red" }}>{errors.saloonService}</span>
        <button type="submit" className="form-btn">
          Submit Appointment
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AppointmentForm;
