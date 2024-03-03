import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
// import Cookies from "js-cookie";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
import log from "loglevel";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    redirectToSignup: false,
    isLoading: true,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
    this.setState({ showSubmitError: true, errorMsg: "" });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
    this.setState({ showSubmitError: true, errorMsg: "" });
  };

  onSubmitSuccess = (jsonData) => {
    const { history } = this.props;

    const { data, token } = jsonData;

    const fullName =
      data.firstName[0].toUpperCase() + data.lastName[0].toUpperCase();

    Cookies.set("jwt_token", token, {
      expires: 30,
    });
    Cookies.set("access_level", data.accessLevel, {
      expires: 30,
    });
    Cookies.set("logidin_user_logo", fullName, {
      expires: 30,
    });
    Cookies.set("email_id", data.emailId, {
      expires: 30,
    });
    toast.success("Login successful. Welcome back!");
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };
  encodePassword = (password) => {
    const encodedPassword = btoa(password);

    return encodedPassword;
  };
  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    try {
      const url = "http://localhost:4001/validation";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailId: username,
          password: this.encodePassword(password),
        }),
      };
      const response = await fetch(url, options);

      const jsonData = await response.json();
      console.log(jsonData);
      if (response.ok === true) {
        this.onSubmitSuccess(jsonData);
        this.setState({ isLoading: false });
      }
    } catch (error) {
      this.onSubmitFailure("invalid username or password");
    }
  };

  handleSignupClick = () => {
    this.setState({ redirectToSignup: true });
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="username">
          EMAIL_ID
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Email Id"
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg, redirectToSignup } = this.state;
    const jwtToken = Cookies.get("jwt_token");

    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    if (redirectToSignup) {
      return <Redirect to="/signup" />;
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <p className="login-style">Login</p>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}
          <p>
            New user?
            <Link
              to="/registartion"
              className="signup-link"
              onClick={this.handleSignupClick}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginForm;
