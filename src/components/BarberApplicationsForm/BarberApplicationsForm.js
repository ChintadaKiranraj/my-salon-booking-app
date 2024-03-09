import React, { useState, useEffect } from "react";
import "./barberapplicationfrm.css";
const BarberApplicationsForm = () => {
  const [salaonApplicationData, setSalaonApplicationData] = useState({
    location: "",
    shopName: "",
    status: "pending",
    description: "",
    months: 0,
    years: 0,
  });
  const [errors, setErrors] = useState({
    location: "",
    shopName: "",
    description: "",
  });
  const [shopNames, setShopsNames] = useState([]);
  const [shopsLocations, setShopsLocations] = useState([]);
const [shopIdOwnerId, setShopIdOwnerId] = useState({shopId:"", ownerId:""});
 
  useEffect(() => {
    const fetchShopsLocations = async () => {
      const response = await fetch("http://localhost:4001/api/shops-locations");
      const shopsFromServer = await response.json();
      setShopsLocations(shopsFromServer.shopsLocations);
      console.log(shopsFromServer.shopsLocations);
    };
    fetchShopsLocations();
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setSalaonApplicationData({
      ...salaonApplicationData,
      [name]: value.trim(),
    });
    setErrors({
      ...errors,
      [name]: value.trim() === "" ? `*${name} is required` : "",
    });

    if (name === "location" && value.trim() !== "") {
      console.log("fetching shops");
      fetchShops(value);
    }
    if(name === "shopName" && value.trim() !== ""){
      console.log("selected shop value -<", value);
      shopNames.some((shop)=>{
        if( shop.shopname===value){
          setShopIdOwnerId({shopId:shop.shopid, ownerId:shop.ownerid})
        }
      
      });
      
    }
  };

  const fetchShops = async (location) => {
    console.log("--------------------fetching shops-----------------");
    console.log("location", location);
    const response = await fetch(
      `http://localhost:4001/api/shopname-by-location/${location}`
    );
    const shopsFromServer = await response.json();
    setShopsNames(shopsFromServer.data);
    console.log(shopsFromServer.data);
  };
  const saveBarberApplicationData = async (data) => {
    try {
      console.log("saveBarberApplicationData:  --> ", data);
      let barberId = 11; //get login user id as barberid
    const { shopId, ownerId } = shopIdOwnerId;
  console.log("shopIdOwnerId --> ", shopId , ownerId)


      const response = await fetch(
        `http://localhost:4001/api/save-barberApplication-data/${barberId}/${shopId}/${ownerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );


console.log("response   =====>   ", response)
const resFromSErver = await response.json();
console.log("resFromSErver   =====>   ", resFromSErver)
if(resFromSErver.success===true){
  alert("Barber Application submitted successfully");
  setSalaonApplicationData({
    location: "",
    shopName: "",
    status: "pending",
    description: "",
    months: 0,
    years: 0,
  });
  setErrors({
    location: "",
    shopName: "",
    description: "",
  });
  
}
      if (resFromSErver.errorCode===400) {
        setErrors({
          ...errors,
          description: resFromSErver.message,
        });
        
      }

    } catch (error) {
      console.log("error", error);}
  };

  const onSubmitBarberApplication = (event) => {
    event.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };
    console.log(
      "salaonApplicationData -------------->>>>",
      salaonApplicationData
    );
    Object.keys(salaonApplicationData).forEach((fieldName) => {
      console.log("fieldName", fieldName);
      let value = salaonApplicationData[fieldName];
      if (String(value).trim() === "") {
        newErrors[fieldName] = `*${fieldName} is required`;
        formIsValid = false;
      } else {
        newErrors.fieldName = "";
      }
    });
    setErrors(newErrors);
    if (formIsValid) {
      saveBarberApplicationData(salaonApplicationData);
    }
  };
  return (
    <div className="barber-application-form-container">
      <h1 className="text-uppercase text-danger">Barber Applications Form</h1>
      <form
        onSubmit={onSubmitBarberApplication}
        className="barber-application-form"
      >
        <label className="label">Location:</label>

        <select
          value={salaonApplicationData.location}
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

        <label className="label">Shop:</label>
        <select
          value={salaonApplicationData.shopName}
          onChange={handleChange}
          name="shopName"
        >
          <option value="" disabled>
            Select a service
          </option>
          {shopNames.map((service, index) => (
            <option key={service.shopid} value={service.shopname}>
              {service.shopname}
            </option>
          ))}
        </select>
        {/* <input type="hidden" name="saloonService" value={salonBookingData.saloonService} /> */}
        <span style={{ color: "red" }}>{errors.shopName}</span>
        <div className="experience-container">
          <div className="label-container">
            <label className="label"> Years of Experience:</label>
            <input
              type="number"
              name="years"
              value={salaonApplicationData.years}
              onChange={handleChange}
              min="0"
              placeholder="0"
              required
            />
          </div>

          <div className="label-container">
            <label className="label">Months of Experience: </label>
            <input
              type="number"
              name="months"
              value={salaonApplicationData.months}
              onChange={handleChange}
              min="0"
              max="11"
              placeholder="0"
              required
            />
          </div>
        </div>
        <label className="label">Description:</label>
        <textarea
          value={salaonApplicationData.description}
          onChange={handleChange}
          name="description"
        ></textarea>
        <span style={{ color: "red" }}>{errors.description}</span>
        <br />
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BarberApplicationsForm;
