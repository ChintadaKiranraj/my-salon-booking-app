import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

class SignupForm extends Component {
  state = {
    firstName: "",
    firstNameErrmsg: "",

    lastName: "",
    lastNameErrmsg: "",

    email: "",
    emailErrmsg: "",

    phoneNumber: "",
    phoneNumberErrmsg: "",

    password: "",
    passwordErrmsg: "",

    confirmPassword: "",
    confirmPasswordErrmsg: "",

    redirectToLogin: false,
    errors: {},
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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

    // Basic validation for required fields
    if (!firstName) {
      // errors.firstName = "First name is required";
      this.setState({ firstNameErrmsg: "First name is required" });
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
      // No errors, submit the form
      console.log("Form submitted:", this.state);
      // After successful submission, redirect to login page
      this.setState({ redirectToLogin: true });
    } else {
      // Update state with errors
      this.setState({ errors });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      firstNameErrmsg,
      email,
      phoneNumber,
      password,
      confirmPassword,
      redirectToLogin,
      errors,
    } = this.state;

    if (redirectToLogin) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="signup-form-container">
        <form onSubmit={this.handleSubmit} className="form">
          <p>Registration</p>

          <div className="form-input-controls formstyle">
            <div className="input-label-field">
              <label htmlFor="firstName">First Name:</label>
              <input
                className="form-control"
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
                placeholder="First Name"
                required
              />
              {firstNameErrmsg != null && firstNameErrmsg !== "" && (
                <p className="error-message">{firstNameErrmsg}</p>
              )}
            </div>
            <div className="input-label-field">
              <label htmlFor="lastName">Last Name:</label>
              <input
                className="form-control"
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
                placeholder="Last Name"
                required
              />
              {errors.lastName && (
                <p className="error-message">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="form-input-controls formstyle">
            <div className="input-label-field">
              <label htmlFor="email">Email ID:</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Email ID"
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="input-label-field">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                className="form-control"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={this.handleChange}
                placeholder="Phone Number"
                required
              />
              {errors.phoneNumber && (
                <p className="error-message">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          <div className="form-input-controls formstyle">
            <div className="input-label-field">
              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Password"
                required
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div className="input-label-field">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                className="form-control"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                placeholder="Confirm Password"
                required
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignupForm;
