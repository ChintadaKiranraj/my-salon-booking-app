import React, { useState, useEffect } from "react";
import "./barberapplicationfrm.css";
import { ToastContainer, toast } from "react-toastify";
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
  const [shopIdOwnerId, setShopIdOwnerId] = useState({
    shopId: "",
    ownerId: "",
  });

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
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value.trim() === "" ? `*${name} is required` : "",
    });

    if (name === "location" && value.trim() !== "") {
      console.log("fetching shops");
      fetchShops(value);
    }
    if (name === "shopName" && value.trim() !== "") {
      console.log("selected shop value -<", value);
      shopNames.some((shop) => {
        if (shop.shopname === value) {
          setShopIdOwnerId({ shopId: shop.shopid, ownerId: shop.ownerid });
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
    let barberId = 100; //get login user id as barberid
    const { shopId, ownerId } = shopIdOwnerId;
    console.log("shopIdOwnerId --> ", shopId, ownerId);
    try {
     

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
      const responseData = await response.json();
      console.log("responseData   =====>   ", responseData);
      if (responseData.code === 201) {
        toast.success("Barber Application submitted successfully");
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

      if (responseData.code === 400) {
        setErrors({
          ...errors,
          description: responseData.message,
        });
        toast.error(responseData.message);
      } else if (responseData.code === 500) {
        toast.error(responseData.message);
        return
      }
    } catch (error) {
      toast.error(
        "Barber Application submitted failed due to " + error.message
      );
    }
  };

  const onSubmitBarberApplication = (event) => {
    event.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };
    console.log("salaonApplicationData -->", salaonApplicationData);
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
      <h3>Barber Applications Form</h3>
      <form
        onSubmit={onSubmitBarberApplication}
        className="barber-application-form"
      >
        <div className="row">
          <div className="col-6">
            <label className="label">Location:</label>

            <select
              value={salaonApplicationData.location}
              onChange={handleChange}
              name="location"
            >
              <option value="" disabled>
                Choose a shop location
              </option>
              {shopsLocations.map((service, index) => (
                <option key={index} value={service.location}>
                  {service.location}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>{errors.location}</span>
          </div>
          <div className="col-6">
            <label className="label">Shop name:</label>
            <select
              value={salaonApplicationData.shopName}
              onChange={handleChange}
              name="shopName"
            >
              <option value="" disabled>
                Choose shop name
              </option>
              {shopNames.map((service, index) => (
                <option key={service.shopid} value={service.shopname}>
                  {service.shopname}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>{errors.shopName}</span>
          </div>{" "}
        </div>

        <div className="row">
          <div className="col-3">
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

          <div className="col-3">
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
          <div className="col-6">
            <label className="label">Description:</label>
            <textarea
              rows="2"
              cols="50"
              maxLength={100}
              value={salaonApplicationData.description}
              onChange={handleChange}
              name="description"
            ></textarea>
            <br />
            <span style={{ color: "red" }}>{errors.description}</span>
          </div>
        </div>

        <button type="submit">Submit</button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default BarberApplicationsForm;
