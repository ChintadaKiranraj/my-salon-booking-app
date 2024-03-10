import React from "react";
import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import "./bookingformtwo.css";
// import "../Welcome/welcome.css";
// import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const BookingFormTwo = () => {
  const salonServices = [
    "Haircut",
    "Shampoo and Blow Dry",
    "Hair Color",
    "Manicure",
    "Pedicure",
    "Facial",
    "Massage",
  ];

  // const ShopDetails=(shopDetails)=>{
  //   console.log("shopDetails at shop card ",shopDetails)
  //  const {location,owneremail,ownername,phonenumber,shopid,shopname,userid}=shopDetails;
  //   return(
  //     <div className="card">
  //     <h2>{shopname}</h2>
  //     <p><span className="highlight">Owner:</span> {ownername}</p>
  //     <p><span className="highlight">Email:</span> {owneremail}</p>
  //     <p><span className="highlight">Location:</span> {location}</p>
  //     <p><span className="highlight">Phone:</span> {phonenumber}</p>
  //   </div>
  // )}

  const [salonShopsList, setSalonShopsList] = useState([]);
  const [shopsLocations, setShopsLocations] = useState([]);
  const [shopIdOwnerId, setShopIdOwnerId] = useState({
    shopId: "",
    ownerId: "",
  });

  useEffect(() => {
    const fetchAllLocation = async () => {
      const response = await fetch("http://localhost:4001/api/shops-locations");
      const shopsFromServer = await response.json();
      setShopsLocations(shopsFromServer.shopsLocations);
      console.log(shopsFromServer.shopsLocations);
    };
    fetchAllLocation();
    // fetchShops()
  }, []);

  const [selectedShop, setSelectedShop] = useState("");

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
    const response = await fetch(
      `http://localhost:4001/api/shopname-by-location/${location}`
    );
    const shopsFromServer = await response.json();
    setSalonShopsList(shopsFromServer.data);
    console.log("fetchShopNamesByLocation");
    console.log(shopsFromServer.data);
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
    debugger;
    if (formIsValid) {
      console.log("salonBookingData", salonBookingData);
      const userId = 1; //get this user id from the login uaser
      const { shopId, ownerId } = shopIdOwnerId;
      fetch(
        `http://localhost:4001/api/saloon-booking/${userId}/${shopId}/${ownerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(salonBookingData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitSaloonBooking} className="appoin-form">
        <label>Appointment Date & Time:</label>
        <input
          className="input-field"
          type="datetime-local"
          name="datetime"
          value={salonBookingData.datetime}
          placeholder="Select a date and time"
          onChange={handleChange}
        />

        <span style={{ color: "red" }}>{errors.datetime}</span>
        <label >Select Location:</label>

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
        <label>Select Salon Shop:</label>

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

        <label>Select Salon Service:</label>
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
            <option key={index} value={service}>
              {service}
            </option>
          ))}
        </select>
        <span style={{ color: "red" }}>{errors.saloonService}</span>

        <button type="submit" className="form-btn">
          BOOK AN APPOINTMENT
        </button>
      </form>
    </div>
  );
};

export default BookingFormTwo;
