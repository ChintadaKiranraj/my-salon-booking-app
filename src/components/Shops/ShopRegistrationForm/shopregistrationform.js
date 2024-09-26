import React, { useEffect, useState } from "react";
import "./shopregistrationform.css";
import { ToastContainer, toast } from "react-toastify";
import shopImg from "../../../assets/images/nine.jpg";
import axios from "axios";
import { getUserDetails, toBase64 } from "../../Utilities/Utilities";

const SHOP_NAME_EXISTS_MESSAGE = "Shop name already exists. Please choose a unique name for better identification and popularity";

 
const ShopRegistrationForm = () => {
  const [shopsLocations, setShopsLocations] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false)
  const [shopRegistrationData, setShopRegistrationData] = useState({
    shopName: "",
    location: "",
    profilePhoto: "",
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
  }, [refreshPage]);
  const isShopNmaeIsAvailable = async (shopName) => {
    let ownerId = getUserDetails().userid; // get the login user id as ownerId
    const response = await fetch(
      `http://localhost:4001/api/shop-name-availability/${shopName}/${ownerId}`
    );
    const data = await response.json();
    console.log("data  =====>", data);
  
    if (data.message.toLowerCase() === SHOP_NAME_EXISTS_MESSAGE.toLowerCase()) {
      setErrors({
        ...errors,
        shopName: "Shop name is already taken",
      });
    }
  };
  const saveShopRegistrationData = async () => {
    console.log("shopRegistrationData --->2", shopRegistrationData);
    try {
      const ownerId =getUserDetails().userid;
      const response = await fetch(
        `http://localhost:4001/api/barber-shop-registration/${ownerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shopRegistrationData),
        }
      );
      const responseData = await response.json();

      console.log("responseData", responseData);
      if (responseData.code === 200 && responseData.status === true) {
        setShopRegistrationData({ location: "", shopName: "",profilePhoto:"" });
        setRefreshPage(!refreshPage)
        toast.success(responseData.message);
      }
    } catch (error) {
      toast.error("Failed to save shop registration data due to " + error);
    }
  };

  const handleChange = async (event) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      
      const file = event.target.files[0];

      if (file) {
        try {
          const base64String = await toBase64(file);

          setShopRegistrationData({
            ...shopRegistrationData,
            [name]: base64String,
          });
        } catch (error) {
          console.error("Error converting image to base64:", error.message);
          toast.error("Error converting image to base64:", error.message);
        }
      }
    } else {
      setShopRegistrationData({
        ...shopRegistrationData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: value.trim() === "" ? `*${name} is required` : "",
    });

    if (name === "shopName" && value.trim() !== "") {
      // make api call to fetch the location
      // is shop name is alredy tacken by the other users or not
      isShopNmaeIsAvailable(value);
    }
  };
  const onSubmitShopRegistration = (event) => {
    event.preventDefault();
    console.log("shopRegistrationData  -->", shopRegistrationData);
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
    });

    setErrors(newErrors);

    if (formIsValid && Object.values(errors).every((error) => error === "")) {
      console.log("shopRegistrationData", shopRegistrationData);

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
        <label>Photo</label>
        <input type="file" name="profilePhoto" onChange={handleChange}/>

        <br />
        <button type="submit">Submit</button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ShopRegistrationForm;


