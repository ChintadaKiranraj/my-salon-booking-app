import React, { useEffect, useState } from "react";
import "./shopregistrationform.css";
import { ToastContainer, toast } from "react-toastify";
import shopImg from "../../assets/images/nine.jpg";

import axios from "axios";
import { toBase64 } from "../ShopsTwo/shopTwo";
const SHOP_NAME_EXISTS_MESSAGE = "Shop name already exists.";

const ShopRegistrationForm = () => {
  const [shopsLocations, setShopsLocations] = useState([]);
  const [shopRegistrationData, setShopRegistrationData] = useState({
    shopName: "",
    location: "",
    profilePhoto:"",
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
    console.log("shopRegistrationData --->2", shopRegistrationData);
    try {
      const ownerId = 1; // get the login user id as ownerId
      const response = await fetch(
        `http://localhost:4001/api/barber-shop-registration/${ownerId}`,
        {
          method:"post",
          headers:{
              "Content-Type": "application/json",
            
          },
          body:JSON.stringify(shopRegistrationData)
      });
      
       
      

      if (response.status !== 201) {
        toast.error("Failed to save shop registration data");
        return;
      }

      const responseData = response.data;

      setShopRegistrationData({ location: "", shopName: "" });
      toast.success("Shop registration is successful");
      console.log("responseData", responseData);
    } catch (error) {
      toast.error(
        "Failed to save shop registration data due to " + error.message
      );
    }
  };


   const toBase64 = (file, maxSizeInBytes) => {
    return new Promise((resolve, reject) => {
        if (file.size > maxSizeInBytes) {
            reject(new Error('Image size exceeds the maximum allowed size'));
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
  const handleChange = async(event) => {
    const { name, value ,type} = event.target;
    if (type === 'file') {

      debugger
      const file = event.target.files[0]; 

      if (file) {

          try{
              debugger
              const maxSizeInBytes = 5 * 1024 * 1024;
              const base64String = await toBase64(file, maxSizeInBytes);
              debugger
              setShopRegistrationData({
                ...shopRegistrationData,
                [name]: base64String,
              });
          }catch(error){
              console.error('Error converting image to base64:', error.message);
              toast.error('Error converting image to base64:', error.message);


          }
         
      }
  }else{
    setShopRegistrationData({
      ...shopRegistrationData,
      [name]: value,
    });
  }
    
    
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
console.log("shopRegistrationData  -->",shopRegistrationData)
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
                <input type='file' name='profilePhoto' onChange={handleChange}/>
             
                <br/>
        <button type="submit">Submit</button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ShopRegistrationForm;


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
