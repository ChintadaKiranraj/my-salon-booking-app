import React, { useEffect, useState } from "react";
import "./shopregistrationform.css";
import { ToastContainer, toast } from "react-toastify";
import shopImg from "../../assets/images/nine.jpg";

import axios from "axios";
const SHOP_NAME_EXISTS_MESSAGE = "Shop name already exists.";

const ShopRegistrationForm = () => {
  const [shopsLocations, setShopsLocations] = useState([]);
  const [shopRegistrationData, setShopRegistrationData] = useState({
    shopName: "",
    location: "",
  });
  const [errors, setErrors] = useState({
    shopName: "",
    location: "",
  });

  useEffect(() => {
    const fetchShopsLocations = async () => {
      const response = await fetch("http://localhost:4001/api/get-locations");
      const shopsFromServer = await response.json();
      console.log(shopsFromServer.data);
      setShopsLocations(shopsFromServer.data);
    };
    fetchShopsLocations();
  }, []);

  const saveShopRegistrationData = async () => {
    try {
      const ownerId = 1; // get the login user id as ownerId
      const response = await axios.post(
        `http://localhost:4001/api/barber-shop-registration/${ownerId}`,
        shopRegistrationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        toast.error("Failed to save shop registration data");
        return;
      }

      const responseData = response.data;

      setShopRegistrationData({ location: "", shopName: "" });
      toast.success("Shop registration is successful");
    } catch (error) {
      toast.error(
        "Failed to save shop registration data due to " + error.message
      );
    }
  };

  // const isShopNmaeIsAvailable = async (shopName) => {
  //   let ownerId = 6; // get the login user id as ownerId
  //   const response = await fetch(
  //     `http://localhost:4001/api/shop-name-availability/${shopName}/${ownerId}`
  //   );
  //   const data = await response.json();
  //   console.log("data  =====>", data);

  //   if (data.message.toLowerCase() === SHOP_NAME_EXISTS_MESSAGE.toLowerCase()) {
  //     setErrors({
  //       ...errors,
  //       shopName: "Shop name is already taken",
  //     });
  //   }
  // };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setShopRegistrationData({
      ...shopRegistrationData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value.trim() === "" ? `*${name} is required` : "",
    });

    // if (name === "shopName" && value.trim() !== "") {
    //   // make api call to fetch the location
    //   // is shop name is alredy tacken by the other users or not
    //   isShopNmaeIsAvailable(value);
    // }
  };
  const onSubmitShopRegistration = (event) => {
    event.preventDefault();

    let formIsValid = true;
    const newErrors = { ...errors };

    console.log("shopRegistrationData", shopRegistrationData);
    Object.keys(shopRegistrationData).forEach((fieldName) => {
      console.log("fieldName", fieldName);
      let value = shopRegistrationData[fieldName];
      if (value.trim() === "") {
        newErrors[fieldName] = `*${fieldName} is required`;
        formIsValid = false;
      }
      //  {
      //   newErrors.fieldName = "";
      // }
    });

    setErrors(newErrors);
    debugger;
    if (formIsValid && Object.values(errors).every((error) => error === "")) {
      console.log("shopRegistrationData", shopRegistrationData);
      // make api call to store the  shop registration data
      saveShopRegistrationData(shopRegistrationData);
    }
  };

  return (
    <div className="shop-registration-form-container">
      <div>
        <img src={shopImg} />
      </div>
      <form onSubmit={onSubmitShopRegistration}>
        <h2>Salon Registration Form</h2>
        <label>Shop Name:</label>
        <input
          type="text"
          name="shopName"
          value={shopRegistrationData.shopName}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{errors.shopName}</span>
        <br />
        <label>Location:</label>

        <select
          name="location"
          value={shopRegistrationData.location}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a location for the shop
          </option>
          {shopsLocations.map((eachLocationObj) => (
            <option
              key={eachLocationObj.locationid}
              value={eachLocationObj.locationname}
            >
              {eachLocationObj.locationname}
            </option>
          ))}
        </select>

        <span style={{ color: "red" }}>{errors.location}</span>

        <br />
        <button type="submit">Submit</button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ShopRegistrationForm;
