import React, { useState } from "react";
import "./UserRegistrationForm.css";
import { ToastContainer, toast } from "react-toastify";
// import registrationAvatar from "../../assets/images/registration-avatar.svg";
import PhotoCarousel from "../../Welcome/PhotoCarousel";
import { toBase64 } from "../../ShopsTwo/shopTwo";
const RegistrationForm = () => {
  const [userRegistrationData, setUserRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
    phoneNumber: "",
    userType: "User",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
    phoneNumber: "",
    userType: "",
  });

  const handleUserChange = async(event) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      
      const file = event.target.files[0];

      if (file) {
        try {
          const base64String = await toBase64(file);

          setUserRegistrationData({
            ...userRegistrationData,
            [name]: base64String,
          });
        } catch (error) {
          console.error("Error converting image to base64:", error.message);
          toast.error("Error converting image to base64:", error.message);
        }
      }
    } else{
      setUserRegistrationData({ ...userRegistrationData, [event.target.name]: event.target.value });

    }
  };

  async function registerUser(userRegistrationData) {
    console.log("userData:", userRegistrationData);

    try {
      // Step 1: Register the User
      const userResponse = await fetch(
        "http://localhost:4001/api/registerUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRegistrationData),
        }
      );

      const userDataFromServer = await userResponse.json();

      // Check if the user registration was successful
      if (!userDataFromServer.success) {
        // Handle error
        // console.error("User registration failed:", userDataFromServer.message);
        toast.error("User registration failed:", userDataFromServer.message);
        return;
      }else{
        setUserRegistrationData({...userRegistrationData,firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePhoto: "",
        phoneNumber: "",
        userType: "",});
        toast.success("User registration successful");

      }
    } catch (error) {
      toast.error("Error during registration:", error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let formIsValid = true;
    const newErrors = { ...errors };
    console.log("userData", userRegistrationData);
    Object.keys(userRegistrationData).forEach((fieldName) => {
      console.log("fieldName", fieldName);
      let value = userRegistrationData[fieldName];
      if (value.trim() === "") {
        newErrors[fieldName] = `*${fieldName} is required`;
        formIsValid = false;
      } 
      // else {
      //   newErrors.fieldName = "";
      // }
    });
    setErrors(newErrors);
    if (formIsValid) {
      registerUser(userRegistrationData);
    }
  };

  return (
  
    <div  className="user-registration-form-out-container">
      <PhotoCarousel/>
        <div className="user-registration-form-container col-6">
          <h1>Sign Up Now</h1>
          <form onSubmit={handleSubmit} className="user-registration-form">
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={userRegistrationData.firstName}
                  onChange={handleUserChange}
                />
                <span className="error-message">{errors.firstName}</span>
              </div>

              <div className="form-group col-6">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userRegistrationData.lastName}
                  onChange={handleUserChange}
                />
                <span className="error-message">{errors.lastName}</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userRegistrationData.email}
                onChange={handleUserChange}
              />
              <span className="error-message">{errors.email}</span>
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userRegistrationData.password}
                  onChange={handleUserChange}
                />
                <span className="error-message">{errors.password}</span>
              </div>

              <div className="form-group col-6">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userRegistrationData.confirmPassword}
                  onChange={handleUserChange}
                />
                <span className="error-message">{errors.confirmPassword}</span>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userRegistrationData.phoneNumber}
                  onChange={handleUserChange}
                />
                <span className="error-message">{errors.phoneNumber}</span>
              </div>

              <div className="form-group col-6">
                <label htmlFor="profilePhoto">Profile Picture:</label>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  onChange={handleUserChange}
                />
                <span className="error-message">{errors.profilePhoto}</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="userType">User Type:</label>
              <select
                id="userType"
                name="userType"
                value={userRegistrationData.userType}
                onChange={handleUserChange}
              >
                <option value="User">User</option>
                <option value="Shop Owner">Shop Owner</option>
                <option value="Barber">Barber</option>
              </select>
              <span className="error-message">{errors.userType}</span>
            </div>

            <button type="submit">
            Sign Up Now
            </button>
          </form>
      <ToastContainer/>
      </div>
    </div>
  );
};

export default RegistrationForm;
