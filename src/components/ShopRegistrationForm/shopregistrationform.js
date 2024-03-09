import React, { useState } from "react";
const SHOP_NAME_EXISTS_MESSAGE = "Shop name already exists.";

const ShopRegistrationForm = () => {
  const [shopRegistrationData, setShopRegistrationData] = useState({
    shopName: "",
    location: "",
  });
  const [errors, setErrors] = useState({
    shopName: "",
    location: "",
  });
  const saveShopRegistrationData = async () => {
    console.log("shopRegistrationData", shopRegistrationData);
    let ownerId = 1; // get the login user id as ownerId
    const shopOwnerResponse = await fetch(
      `http://localhost:4001/api/barber-shop-registration/${ownerId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...shopRegistrationData,
        }),
      }
    );
    const shopOwnerData = await shopOwnerResponse.json();
    console.log("shopOwnerData  ==<<<  ", shopOwnerData);
if(shopOwnerData.success && shopOwnerData.code === 201){
  shopRegistrationData.shopName = "";
  shopRegistrationData.location = "";
      alert("Shop registration is successful");
    }
  };

  const isShopNmaeIsAvailable = async (shopName) => {
    let ownerId = 6; // get the login user id as ownerId
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

    if (name === "shopName" && value.trim() !== "") {
      // make api call to fetch the location
      // is shop name is alredy tacken by the other users or not
      isShopNmaeIsAvailable(value);
    }
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

    if (formIsValid && Object.values(errors).every((error) => error === "")){
      console.log("shopRegistrationData", shopRegistrationData);
      // make api call to store the  shop registration data
      saveShopRegistrationData(shopRegistrationData);
    }
  };

  return (
    <div>
      <h2 className="text-uppercase text-dark">Shop Registration Form</h2>
      <form onSubmit={onSubmitShopRegistration}>
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
        <input
          type="text"
          name="location"
          value={shopRegistrationData.location}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{errors.location}</span>

        <br />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShopRegistrationForm;
