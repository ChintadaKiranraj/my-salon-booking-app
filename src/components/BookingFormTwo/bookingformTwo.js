import React from 'react';
import { useState ,useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import "./bookingformtwo.css"

const BookingFormTwo = () => { 
  const salonServices = [
    'Haircut',
    'Shampoo and Blow Dry',
    'Hair Color',
    'Manicure',
    'Pedicure',
    'Facial',
    'Massage',

    
  ];


  const ShopDetails=(shopDetails)=>{
    console.log("shopDetails at shop card ",shopDetails)
   const {location,owneremail,ownername,phonenumber,shopid,shopname,userid}=shopDetails;
    return(
      <div className="card">
      <h2>{shopname}</h2>
      <p><span className="highlight">Owner:</span> {ownername}</p>
      <p><span className="highlight">Email:</span> {owneremail}</p>
      <p><span className="highlight">Location:</span> {location}</p>
      <p><span className="highlight">Phone:</span> {phonenumber}</p>
    </div>
  )}

  const [salonShops,setShops]=useState([])
  useEffect(()=>{
      const fetchShops=async()=>{
          const response=await fetch("http://localhost:4001/api/get-all-shops")
          const shopsFromServer=await response.json()
          console.log("shopsFromServer",shopsFromServer.shops)
          setShops(shopsFromServer.shops)
          console.log(shopsFromServer.shops)
      }
      fetchShops()
  },[])
  const [selectedShopObj, setSelectedShopObj] = useState();


  const [selectedShop, setSelectedShop] = useState('');
  // const handleSelectService = (event) => {
  //   setSelectedService(event.target.value);
  // };
  // const handleSelectedShop = (event) => {
  //   setSelectedShop(event.target.value);
  // };
  const [salonBookingData, setSalonBookingData] = useState({
    datetime: "",
    status: "pending",
    saloonService:"",
    saloonShop: "",
    userId: "",
    barberId: "",
    shopId: "",
  });
  const [errors, setErrors] = useState({
    datetime: "",
    status: "pending",
    saloonService: "",
    saloonShop: "",
    userId: "",
    barberId: "",
    shopId: "",
  }); 

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
}

const onSelectShop = (event) => {
  const { name, value } = event.target;
  setSalonBookingData({
    ...salonBookingData,
    [name]: value,
  });
  setErrors({
    ...errors,
    [name]: value.trim() === "" ? `*${name} is required` : "",
  });

  setSelectedShopObj(salonShops.find((shop) => shop.shopname === value));
}

  const onSubmitSaloonBooking = (event) => {
    event.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };
    console.log("salonBookingData", salonBookingData);
    Object.keys(salonBookingData).forEach((fieldName) => {
      console.log("fieldName", fieldName);
      let value = salonBookingData[fieldName];
      if (value.trim() === "") {
        newErrors[fieldName] = `*${fieldName} is required`;
        formIsValid = false;
      } else {
        newErrors.fieldName = "";
      }
    });
    setErrors(newErrors);
    if (formIsValid) {
    //  api call
    }
  }

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
        <span style={{ color: "red" }}>{errors.datetime}</span>
        <br />
        <label>Shop:</label>
    
      <select value={salonBookingData.saloonShop} onChange={handleChange} name="saloonShop">
        <option value="" disabled>Select a saloon  shop</option>
        {salonShops.map((service, index) => (
          <option key={service.shopid} value={service.shopname} onClick={()=>{
            setSelectedShopObj(service)
          }}>
            {service.shopname}

          </option>
        ))}
      </select>
      {/* <input type="hidden" name="saloonShop" value={salonBookingData.selectedShop} /> */}
      <span style={{ color: "red" }}>{errors.saloonShop}</span>
      {salonBookingData.saloonShop &&  <Tooltip title={<ShopDetails shopDetails={selectedShopObj}/>} placement="top-start" arrow>
      <p>You selected: {salonBookingData.saloonShop}</p>
       </Tooltip>}
        
      <label>Select a Salon Service:</label>
      <select value={salonBookingData.saloonService} onChange={handleChange} name="saloonService">
        <option value="" disabled>Select a service</option>
        {salonServices.map((service, index) => (
          <option key={index} value={service}>
            {service}
          </option>
        ))}
      </select>
      {/* <input type="hidden" name="saloonService" value={salonBookingData.saloonService} /> */}
      <span style={{ color: "red" }}>{errors.saloonService}</span>
      
{salonBookingData.saloonService && 
      <p>You selected: {salonBookingData.saloonService}</p>}


        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  
}



export default BookingFormTwo;
