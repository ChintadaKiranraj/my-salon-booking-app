import React from "react";
import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./appointment.css";
// import "../Welcome/welcome.css";
// import React, { useState } from 'react';
// import   {EachShop }  from './components/Shops';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getUserDetails } from "../../Utilities/Utilities";



const BookingFormTwo = (  props) => {
  // const {buttonContent,isEditMode,userId} = props;

  // const formBtnContent=isEditMode?buttonContent:"BOOK AN APPOINTMENT";
  const salonServices = [
    "kiranraj",
    "Haircut",
    "Shampoo and Blow Dry",
    "Hair Color",
    "Manicure",
    "Pedicure",
    "Facial",
    "Massage",
  ];

  
  const [isBooingOrUpdation, setIsBookingOrUpdation] = useState(true);
  const [salonShopsList, setSalonShopsList] = useState([]);
  const [shopsLocations, setShopsLocations] = useState([]);
  const [shopIdOwnerId, setShopIdOwnerId] = useState({
    shopId: "",
    ownerId: "",
  });
  const fetchAllLocation = async () => {
    const response = await fetch("http://localhost:4001/api/shops-locations");
    const shopsFromServer = await response.json();
    setShopsLocations(shopsFromServer.shopsLocations);
    console.log(shopsFromServer.shopsLocations);
  };
  useEffect(() => {
    fetchAllLocation();
    // fetchShops()
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
    const response = await fetch(
      `http://localhost:4001/api/shopname-by-location/${location}`
    );
    const responseData = await response.json();
    setSalonShopsList(responseData.data);
    console.log("fetchShopNamesByLocation");

    console.log(responseData.data);
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
  const EachShop = (props) => {
    const { shop } = props;
    const {
      shopid,
      shopname,
      location,
      ownername,
      phonenumber,
      userid,
      owneremail,
    } = shop;
    return (
      <li className="service-card">
        <p>shopid: {shopid}</p>
        <p>userid: {userid}</p>
        <p>shopname: {shopname}</p>
        <p>location: {location}</p>
        <p>ownername: {ownername}</p>
        <p>owneremail: {owneremail}</p>
        <p>shop Phone number: {phonenumber}</p>
      </li>
    );
  };

  const bookAnAppointment = async (appointmentData) => {
    debugger;
    const userId = getUserDetails().userid;
    //get this user id from the login uaser
    const { shopId, ownerId } = shopIdOwnerId;
    console.log("appointmentData", appointmentData);
    console.log("userId", userId);
    console.log("shopId", shopId);
    console.log("ownerId", ownerId);

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

  return (
    <div>
      <h2 className="form-title">Book Your Beauty Appointment</h2>
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
        <label>Select Location:</label>

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
        <button  type="submit" className="form-btn">Submit Appointment</button>
        {/* form-btn */}
          {/* <button type="submit" className={!isEditMode ?"form-btn":""}> */}
           {/* {formBtnContent} */}
          {/* </button> */}
          {/* { isEditMode &&<button className="mr-auto" type="button">Cancle</button>} */}
      </form>
     
   

      {/* {true && (
        <ul>
          {salonShopsList.map((shop) => (
            <EachShop key={shop.shopid} shop={shop} />
          ))}
        </ul>
      )} */}

      <ToastContainer />
    </div>
  );
};

export default BookingFormTwo;
// try{
//   fetch(
//     `http://localhost:4001/api/saloon-booking/${userId}/${shopId}/${ownerId}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(salonBookingData),
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }catch(exception){
//   toast.error("Error in booking appointment")
// }
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