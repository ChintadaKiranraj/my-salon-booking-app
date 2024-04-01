import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FiSave } from "react-icons/fi";
import { Loader, User, getUserDetails } from "../../Utilities/Utilities";

import "../../Utilities/Utilities.css";
import './EditUserAppointment.css'
const EditUserAppointment = (props) => {
  debugger;
  const { userAppointmentsEditData, setUserAppointmentsEditData } = props;

  const { appointment } = userAppointmentsEditData;
  console.log("appointment ____XXXXXXXXXX", appointment);

  //1.once the user click on the cancel button we are setting the isEditAppointmentClicked
  //2.to false to close the edit user appointment form
  const cancleEditAppontment = () => {
    setUserAppointmentsEditData({
      ...userAppointmentsEditData,
      isEditAppointmentClicked: false,
    });
  };
  const [salonServices, setSalonServices] = useState([]);
  const [showDateTimeInput, setShowDateTimeInput] = useState(false);
  const [shopsLocations, setShopsLocations] = useState([]);
  const [salonShops, setSalonShopsList] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [myAppointments, setMyAppointment] = useState({ ...appointment });
  const [shopIdOwnerId, setShopIdOwnerId] = useState({
    shopId: "",
    ownerId: "",
  });
  const fetchAllLocation = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/shops-locations");
      const responseJson = await response.json();

      if (responseJson.code === 200) {
        setShopsLocations(responseJson.data);
        // toast.success("Locations fetched successfully");
      }
    } catch (e) {
      toast.error("Error in fetching locations", e);
    }
  };
  const salonServicess = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/salonServicess");
      const responseJson = await response.json();

      // console.log("salonServicess XX", responseJson.data);
      if (responseJson.code === 200) {
        setSalonServices(responseJson.data);
        if (shopsLocations.length > 0 && salonServices.length > 0) {
          setDataLoaded(true);
        }
        // toast.success("salonServicess fetched successfully");
      }
    } catch (e) {
      toast.error("Error in fetching locations", e);
    }
  };
  const fetchShopNamesByLocation = async (location = appointment.location) => {
    
    console.log("location", location);

    try {
      const response = await fetch(
        `http://localhost:4001/api/shopname-by-location/${location}`
      );
      const responseData = await response.json();
      if (responseData.code === 200) {
        console.log("inside fetch the shops list  basedd on the location")
        setSalonShopsList(responseData.data);
        const {shopname}=responseData.data[0]
        setMyAppointment({...myAppointments,
          shopname :shopname
        })
      }

    } catch (e) {
      toast.error(
        "Error in fetching shop names by location. Please try again later."
      );
    }
  };
  useEffect(() => {
    fetchAllLocation();
    salonServicess();
    fetchShopNamesByLocation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

console.log("at handelChanges  -->  ",value)

    
    setMyAppointment({
      ...myAppointments,
      [name]: value,
    });

    // if (name === "location" && value.trim() !== "") {
    //   fetchShopNamesByLocation(value);
    //   // setMyAppointment({ ...myAppointments, shopname: "" });
    // }
    if (name === "shopname" && value.trim() !== "") {
      salonShops.some((shop) => {
        if (shop.shopname === value) {
          setShopIdOwnerId({ shopId: shop.shopid, ownerId: shop.ownerid });
        }
      });
    }
  };
  const UpdateUserAppontment = async () => {
 
    console.log(myAppointments,"MyAppointments-->>")
    const updatedTime = !showDateTimeInput
      ? null
      : myAppointments.bookingdatetime;
    const updatedAppointment = {
      ...myAppointments,
      bookingdatetime: updatedTime,
    };

    console.log("updatedAppointment--xxxxxxxxx", updatedAppointment);

    try {
      const response = await fetch(
        `http://localhost:4001/api/updatye-booking`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAppointment),
        }
      );
      const JsonData = await response.json();
      console.log("Updated the user appointment -----12334", JsonData);

      if (JsonData.status === true && JsonData.code === 200) {
        toast.success(JsonData.message);

        setTimeout(() => {
          setUserAppointmentsEditData({
            ...userAppointmentsEditData,
            isEditAppointmentClicked: false,
          });
        }, 1000);
    
      }
    } catch (exception) {
      toast.error("Error in update an  appointment", exception);
    }
  };
  setTimeout(() => {
    setDataLoaded(true);
  }, 1000);
  const onClickDateChange = () => {
    setShowDateTimeInput(!showDateTimeInput);
  };

  const handleLocationChange = (selectedLocation) => {
    fetchShopNamesByLocation(selectedLocation);
  };

  return (
    <div>
      {/* we are displaying this form based on the if all the data is loaded  or else we are showing the loader*/}
      {!isDataLoaded ? (
        <div className="modalss">
          <div className="loader-modal-contents">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="modalss">
          <div className="modal-contents large-content">
            <h2>Edit user application Details</h2>
            <form>
              <div className="row">
                <div className="col-6">
                  <label>location</label>
                  <select
                    name="location"
                    id="location"
                    defaultValue={myAppointments.location}
                    onChange={(e) => {
                      handleChange(e);
                      handleLocationChange(e.target.value);
                    }}
                  >
                    {shopsLocations.map((locationObj, index) => (
                      <option key={index} value={locationObj.location}>
                        {locationObj.location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6">
                  <label>shopname</label>

                  <select
                    name="shopname"
                    id="shopname"
                    defaultValue={myAppointments.shopname}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Choose a shopname
                    </option>
                    {salonShops.map((service, index) => (
                      <option key={index} value={service.shopname}>
                        {service.shopname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <label>booking date time</label>
                  <input
                    type="datetime-local"
                    name="bookingdatetime"
                    id="bookingdatetime"
                    value={myAppointments.bookingdatetime}
                    onChange={handleChange}
                    style={{ display: showDateTimeInput ? "block" : "none" }}
                  />

                  <input
                    id="input-date-time"
                    value={myAppointments.bookingdatetime}
                    onChange={onClickDateChange}
                    style={{ display: showDateTimeInput ? "none" : "block" }}
                  />
                </div>

                <div className="col-6">
                  <label>Service</label>
                  <select
                    name="saloon_service"
                    id="service"
                    defaultValue={
                      myAppointments.saloon_service || "Select service"
                    }
                    onChange={handleChange}
                  >
                    {salonServices.map((service, index) => (
                      <option key={index} value={service.servicename}>
                        {service.servicename}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
            <div className="modal-button-container">
              <>
                <button
                  className="appontment-update-btn"
                  onClick={UpdateUserAppontment}
                >
                  Update 
                </button>
              </>

              <button className="appontment-cancle-btn" onClick={cancleEditAppontment}>
                Cancel
               
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default EditUserAppointment;
