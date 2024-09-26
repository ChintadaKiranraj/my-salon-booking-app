
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
const BarberRegistrationForm = () => {
  const [barberRegistrationData, setBarberRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilePhoto: "",
    experience: '0',
    description: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilePhoto: "",
    experience: "",
    description: "",
  });

  const saveBarberRegistrationData = async () => {
    console.log("barberRegistrationData", barberRegistrationData);

    const barberResponse = await fetch('http://localhost:4001/api/barber-registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...barberRegistrationData
      })
    });
    // Handle the response from the server if needed
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBarberRegistrationData({
      ...barberRegistrationData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value.trim() === "" ? `*${name} is required` : "",
    });
  };

  const onSubmitBarberRegistration = (event) => {
    event.preventDefault();

    let formIsValid = true;
    const newErrors = { ...errors };

    console.log("barberRegistrationData", barberRegistrationData);
    Object.keys(barberRegistrationData).forEach((fieldName) => {
      console.log("fieldName", fieldName);
      let value = barberRegistrationData[fieldName];
      if (value.trim() === "") {
        newErrors[fieldName] = `*${fieldName} is required`;
        formIsValid = false;
      } else {
        newErrors[fieldName] = "";
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      console.log("barberRegistrationData", barberRegistrationData);
      // make API call to store the barber registration data
      saveBarberRegistrationData(barberRegistrationData);
    }
  };

  return (
    <div>
      <h2>Barber Registration Form</h2>
      <form onSubmit={onSubmitBarberRegistration}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={barberRegistrationData.firstName}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{errors.firstName}</span>
        <br />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={barberRegistrationData.lastName}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{errors.lastName}</span>
        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={barberRegistrationData.email}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{errors.email}</span>
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={barberRegistrationData.password}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{errors.password}</span>
        <br />
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={barberRegistrationData.phoneNumber}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{errors.phoneNumber}</span>
        <br />
        <label>experience:</label>
        <input
          type="text"
          name="experience"
          value={barberRegistrationData.experience}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{errors.experience}</span>
        <br />
        <label>profilePhoto</label>
        <input
          type="text"
          name="profilePhoto"
          value={barberRegistrationData.profilePhoto}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{errors.profilePhoto}</span>
        <br />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={barberRegistrationData.description}
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{errors.profilePhoto}</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BarberRegistrationForm;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./index.css";

// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import PersonIcon from "@material-ui/icons/Person";
// import DeleteIcon from "@material-ui/icons/Delete";




// const BarberRegistrationForm = () => {
//   useEffect(() => {
//         fetchShops();
//       }, []);

//   const [shops, setShops] = useState([]);
//     // const [selectedShop, setSelectedShop] = useState(null);
//     const [formData, setFormData] = useState({
//       barberName: "",
//       shopID: "",
//       profilePhoto: "",
//       experience: "",
//       description: "",
//     });
//     const [errors, setErrors] = useState({
//       barberName: "",
//       shopID: "",
//       profilePhoto: "",
//       experience: "",
//       description: "",
//     });

//     const fetchShops = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:4001/api/get-all-shops"
//         );
//         setShops(response.data.shops);
//       } catch (error) {
//         console.error("Error fetching shops:", error);
//       }
//     };

//     const handleChange = (e) => {
//       const { name, value } = e.target;
//      debugger
//      setFormData({
//         ...formData,
//         [name]: value,
//       });
  
//       setErrors({
//         ...errors,
//         [name]: value.trim() === "" ? `*${name} is required` : "",
//       });
      
//     };
//   // console.log("BarberRegistrationForm")




//   const onSubmitForm = (event) => {
//     debugger
//     event.preventDefault();

//     let formIsValid = true;
//     const newErrors = { ...errors };

//     console.log("formData", formData)
//     Object.keys(formData).forEach((fieldName) => {
//       console.log("fieldName", fieldName)
//       let value = formData[fieldName];
//       if (value.trim() === "") {
//         newErrors[fieldName] = `*${fieldName} is required`;
//         formIsValid = false;
//       } else {
//         newErrors.fieldName = "";
//       }
//     });
   

//     setErrors(newErrors);

//     if (formIsValid) {
//       // if yes make api call
  
//     }
//   };


//   return(
//     <div>
//     <h2>Barber Registration Form</h2>
//     <form onSubmit={onSubmitForm}>
//       <label>
//         Barber Name:
//         <input
//           type="text"
//           name="barberName"
//           value={formData.barberName}
//           // onChange={(e) => setFormData({ ...formData, barberName: e.target.value })}
//           onChange={handleChange}
//         />
//         <span style={{ color: "red" }}>{errors.barberName}</span>
//       </label>
//       <br />

//       <label>
//         Select Shop:
//         <select
//           name="shopID"
//           // onChange={(e) => handleShopSelect(e.target.value)}
//           onChange={handleChange}
//           required
//         >
//           <option value="" disabled>
//             Select a Shop
//           </option>
//           {shops.map((shop) => (
//             <option key={shop.shopid} value={shop.shopid}>
//               {shop.shopname}
//             </option>
//           ))}
//         </select>
//         <span style={{ color: "red" }}>{errors.shopID}</span>
//       </label>
//       <br />

//       <label>
//         Profile Photo:
//         <input
//           type="file"
//           name="profilePhoto"
//           accept="image/*"
//           value={formData.name}
//           // onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.files[0] })}
//           onChange={handleChange}
//         />
//         <span style={{ color: "red" }}>{errors.profilePhoto}</span>
//       </label>
//       <br />

//       <label>
//         Experience (in years):
//         <input
//           type="number"
//           name="experience"
//           value={formData.experience}
//           // onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
//           onChange={handleChange}
//         />
//         <span style={{ color: "red" }}>{errors.experience}</span>
//       </label>
//       <br />

//       <label>
//         Description:
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         />
//         <span style={{ color: "red" }}>{errors.description}</span>
//       </label>
//       <br />

//       <button type="submit">Register</button>
//     </form>
//   </div>

//   )
//  }


//  export default BarberRegistrationForm;