import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify"; // Importing toast function
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    redirectToSignup: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { emailId: username, password };
    debugger;
    console.log(userDetails + " <-------------");
    console.log(userDetails + " <-------------");
    // const url = "https://apis.ccbp.in/login";
    const url = "http://localhost:4001/validate-resgistratation-login-user";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    debugger;
    if (response.ok === true) {
      console.log(response);
      // this.onSubmitSuccess(data.jwt_token);
      this.onSubmitSuccess(data.data);
      toast.success("Login was successfully done!");
      alert("Login as successfully done!!");
    } else {
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
          placeholder="Username"
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
          <p className="login-style">Salon</p>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          <ToastContainer />
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
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
