import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThreeCircles } from "react-loader-spinner";
import { FcUndo } from "react-icons/fc";
import { MdOutlineBackspace } from "react-icons/md";
import "./index.css";

class SignupForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    redirectToLogin: false,
    errors: {},
    isLoading: true,
    isregisteredUser: false,
    openSinUp: false,

    isRequestedForAdminAccess: 0,
  };

  handleChange = (event) => {
    if (event.target.type === "checkbox") {
      console.log(event.target.checked);
      this.setState({
        isRequestedForAdminAccess: event.target.checked ? 1 : 0,
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  encodePassword = (password) => {
    const encodedPassword = btoa(password);

    return encodedPassword;
  };

  decodePassword = (encodedPassword) => {
    const decodedPassword = atob(encodedPassword);

    return decodedPassword;
  };

  registerNewuser = async () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      isRequestedForAdminAccess,
    } = this.state;
    const response = await fetch("http://localhost:4001/save-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        emailId: email,
        phoneNumber,
        password: this.encodePassword(confirmPassword),
        confirmPassword: this.encodePassword(confirmPassword),
        accessLevel: isRequestedForAdminAccess,
      }),
    });
    const data = await response.json();
    console.log("data -->" + data.status);
    if (data.status === true) {
      this.setState({ isregisteredUser: false });
      this.setState({ redirectToLogin: true });
      this.setState({ errors: {} });
      alert("registration was successfully done!");
    } else if (data.status === false) {
      if (data.message.includes('Key ("emailId")')) {
        alert("User already exists try with different use!!");
      } else {
        alert("Failed to create new user!!");
      }
    }
  };

  renderRegistrationForm = () => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      redirectToLogin,
      isRequestedForAdminAccess,
      errors,
      // isregisteredUser,
    } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }
    const navigateToSigin = () => {
      this.setState({ redirectToLogin: true });
    };
    return (
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit} className="registration-form">
          <Link to="/login" className="loginPage" onClick={navigateToSigin}>
            <MdOutlineBackspace />
          </Link>

          <p className="signup-title">Registration</p>

          <div className="form-input-controls formstyle">
            <div className="input-label-field-container">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                className="form-control"
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="error-message">{errors.firstName}</p>
              )}
            </div>
            <div className="input-label-field-container">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                className="form-control"
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="error-message">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="form-input-controls formstyle">
            <div className="input-label-field-container">
              <label htmlFor="email" className="form-label">
                Email ID:
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Email ID"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="input-label-field-container">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <input
                className="form-control"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.handleChange}
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <p className="error-message">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          <div className="form-input-controls formstyle">
            <div className="input-label-field-container">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                className="form-control"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Password"
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div className="input-label-field-container">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
              </label>
              <input
                className="form-control"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="checkbox-labels">
            <input
              type="checkbox"
              id="isRequestedForAdminAcc"
              className="checkbox-input"
              onClick={this.handleChange}
              value={isRequestedForAdminAccess}
            />
            <label htmlFor="isRequestedForAdminAcc" className="checkbox-label ">
              Need Admin Access ?
            </label>
          </div>

          <button type="submit" className="signup-btn btn btn-primary">
            Sign Up
          </button>

          {/* { {isregisteredUser && (
            <p className="error-message">
              You are already registered try with different user
            </p>
          )}} */}
        </form>
      </div>
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = this.state;
    const errors = {};

    if (!firstName) {
      errors.firstName = "First name is required";
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length === 0) {
      this.registerNewuser();
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { isLoading } = this.state;

    return (
      <div className="registrationForm-container">
        {!isLoading ? (
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
        ) : (
          this.renderRegistrationForm()
        )}
      </div>
    );
  }
}

export default SignupForm;
