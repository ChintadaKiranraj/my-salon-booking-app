import React, { useEffect, useState } from "react";

import "./EditShopsData.css";

import { toast } from "react-toastify";

import { ImageDecoder, Loader, toBase64 } from "../../Utilities/Utilities";
const EditShopsData = (props) => {
  const { shopData, cancleUpdate } = props;
  console.log("shopData", shopData);
const [isLoading,setIsLoading]=useState(true)
  const profilePhoto = ImageDecoder(shopData.profilephoto.data);
  const [shopsLocations, setShopsLocations] = useState([]);
  const [shopDataToUpDate, setShopDataToUpDate] = useState({
    location: shopData.location,
    phoneNumber: shopData.phonenumber,
    profilePhoto: profilePhoto,
  });
  const [errors, setErrors] = useState({
    location: "",
    phoneNumber: "",
  });
 
  const onCancle = () => {
    cancleUpdate();
  };
  useEffect(() => {
    const fetchShopsLocations = async () => {
      const response = await fetch("http://localhost:4001/api/get-locations");
      const jsonData = await response.json();
      console.log(jsonData.data);

      if(jsonData.code===200){
        setIsLoading(false)
        setShopsLocations(jsonData.data);
      }
     
    };
    fetchShopsLocations();
  }, []);
  const updateDetails = (e) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = { ...errors };

    Object.keys(shopDataToUpDate).forEach((fieldName) => {
      if (shopDataToUpDate[fieldName].trim() === "") {
        newErrors[fieldName] = `*${fieldName} is required`;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    if (formIsValid) {
     
      updateDhopDetails(shopDataToUpDate);
    }
  };
  const updateDhopDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/update-shop/${shopData.shopid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shopDataToUpDate),
        }
      );
      const data = await response.json();
      if (data.code === 200) {
        toast.success(data.message);
        onCancle();
     
      } else {
        toast.error(data.message);
      
      }
    } catch (error) {
      toast.error("Error in updating shop details", error);
    }
  };
  const handleOnChange = async (event) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      const file = event.target.files[0];

      if (file) {
        try {
          const base64String = await toBase64(file);

          setShopDataToUpDate({
            ...shopDataToUpDate,
            [name]: base64String,
          });
        } catch (error) {
          console.error("Error converting image to base64:", error.message);
          toast.error("Error converting image to base64:", error.message);
        }
      }
    } else {
      setShopDataToUpDate({
        ...shopDataToUpDate,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: value.trim() === "" ? `*${name} is required` : "",
    });
  };

  return (
    <>
      {!isLoading ? (
        <div className="modalss">
          <form onSubmit={updateDetails} className="modal-contents">
            <h2>Edit Shop Details</h2>
            <label>Location</label>
            <select
              name="location"
              id="location"
              defaultValue={shopDataToUpDate.location}
              onChange={handleOnChange}
            >
              {shopsLocations.map((locationObj, index) => (
                <option key={index} value={locationObj.locationname}>
                  {locationObj.locationname}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>{errors.location}</span>
            <br />
            <label>Photo</label>
            <div className="shop-profilepick">
              <input
                type="file"
                placeholder="Photo"
                onChange={handleOnChange}
                name="profilePhoto"
              />
              <img
                src={shopDataToUpDate.profilePhoto}
                className="edit-profile"
                alt="avatar"
              />
            </div>

            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              onChange={handleOnChange}
              value={shopDataToUpDate.phoneNumber}
              name="phoneNumber"
            />
            <span className="erros-msg">{errors.phoneNumber}</span>
            <br />

            <button type="submit" className="mt-4">
              Submit
            </button>
            <button className="pl-3" onClick={onCancle}>
              Cancle
            </button>
          </form>
        </div>
      ) : (
        <div className="modalss">
        <div className="loader-modal-contents">
          <Loader />
        </div>
      </div>
      )}
    </>
  );
};

export default EditShopsData;
