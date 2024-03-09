import React from "react";
import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import "./bookingformtwo.css";
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
  // const [selectedShopObj, setSelectedShopObj] = useState();

  const [selectedShop, setSelectedShop] = useState("");
  // const handleSelectService = (event) => {
  //   setSelectedService(event.target.value);
  // };
  // const handleSelectedShop = (event) => {
  //   setSelectedShop(event.target.value);
  // };
  const [salonBookingData, setSalonBookingData] = useState({
    datetime: "",
    status: "pending",
    saloonService: "",
    shopName: "",
    // userId: "",
    // barberId: "",
    // shopId: "",
    location: "",
  });
  const [errors, setErrors] = useState({
    datetime: "",
    status: "pending",
    saloonService: "",
    shopName: "",
    // userId: "",
    // barberId: "",
    // shopId: "",
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

  // const onSelectShop = (event) => {
  //   const { name, value } = event.target;
  //   setSalonBookingData({
  //     ...salonBookingData,
  //     [name]: value,
  //   });
  //   setErrors({
  //     ...errors,
  //     [name]: value.trim() === "" ? `*${name} is required` : "",
  //   });

  //   setSelectedShopObj(salonShops.find((shop) => shop.shopname === value));
  // }

  const onSubmitSaloonBooking = (event) => {
    event.preventDefault();
    let formIsValid = true;
    debugger
    const newErrors = { ...errors };
    console.log("salonBookingData ====>   ", salonBookingData);
    Object.keys(salonBookingData).forEach((fieldName) => {
      console.log("fieldName", fieldName);
      let value = salonBookingData[fieldName];
      if (value.trim() === "") {
        newErrors[fieldName] = `*${fieldName} is required`;
        formIsValid = false;
      } 
      // else {
      //   newErrors.fieldName = "";
      // }
    });
    setErrors(newErrors);
    debugger
    if (formIsValid) {
      console.log("salonBookingData", salonBookingData);
      const userId = 1; //get this user id from the login uaser
      const { shopId,ownerId } = shopIdOwnerId;
      fetch(`http://localhost:4001/api/saloon-booking/${userId}/${shopId}/${ownerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salonBookingData),
      })
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
      <h2>Saloon Booking</h2>
      <form onSubmit={onSubmitSaloonBooking}>
        <label>Booking Date&Time:</label>
        <input
          type="datetime-local"
          name="datetime"
          value={salonBookingData.datetime}
          onChange={handleChange}
        />

        {/* <DatePicker
          // selected={selectedDate}
          onChange={handleChange}
          showTimeSelect
          name="datetime"
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()} 
          value={salonBookingData.datetime}
        /> */}

        <span style={{ color: "red" }}>{errors.datetime}</span>
        <label className="label">Location:</label>

        <select
          value={salonBookingData.location}
          onChange={handleChange}
          name="location"
        >
          <option value="" disabled>
            Select a saloon shop
          </option>
          {shopsLocations.map((service, index) => (
            <option key={index} value={service.location}>
              {service.location}
            </option>
          ))}
        </select>
        <span style={{ color: "red" }}>{errors.location}</span>
        <br />
        <label>Shop:</label>

        <select
          value={salonBookingData.shopName}
          onChange={handleChange}
          name="shopName"
        >
          <option value="" disabled>
            Select a saloon shop
          </option>
          {salonShopsList.map((service, index) => (
            // <option key={service.shopid} value={service.shopname} onClick={()=>{
            //   setSelectedShopObj(service)
            // }}>
            // {service.shopname}
            <option key={index} value={service.shopname}>
              {service.shopname}
            </option>
          ))}
        </select>
        {/* <input type="hidden" name="saloonShop" value={salonBookingData.selectedShop} /> */}
        <span style={{ color: "red" }}>{errors.shopName}</span>
        {/* {salonBookingData.saloonShop &&  <Tooltip title={<ShopDetails shopDetails={selectedShopObj}/>} placement="top-start" arrow>
      <p>You selected: {salonBookingData.saloonShop}</p>
       </Tooltip>} */}

        <label>Select a Salon Service:</label>
        <select
          value={salonBookingData.saloonService}
          onChange={handleChange}
          name="saloonService"
        >
          <option value="" disabled>
            Select a service
          </option>
          {salonServices.map((service, index) => (
            <option key={index} value={service}>
              {service}
            </option>
          ))}
        </select>
        {/* <input type="hidden" name="saloonService" value={salonBookingData.saloonService} /> */}
        <span style={{ color: "red" }}>{errors.saloonService}</span>

        {salonBookingData.saloonService && (
          <p>You selected: {salonBookingData.saloonService}</p>
        )}

        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingFormTwo;
