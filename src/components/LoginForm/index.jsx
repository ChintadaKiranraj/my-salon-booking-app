import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
// import Cookies from "js-cookie";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import "./index.css";
// import log from "loglevel";
import { jwtDecode } from "jwt-decode";
class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    redirectToSignup: false,
    isLoading: true,
  };

  onChangeUsername = (event) => {
    this.setState({ email: event.target.value });
    this.setState({ showSubmitError: true, errorMsg: "" });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
    this.setState({ showSubmitError: true, errorMsg: "" });
  };

  onSubmitSuccess = (jsonData) => {
    const { history } = this.props;
    debugger
console.log("jsonData  ===> ",jsonData )
    const { jwt_token } = jsonData;
    const userDetails = jwtDecode(jwt_token);

    console.log("userDetails  ===> ", userDetails);

    Cookies.set("jwt_token", jwt_token, {
      expires: 30,
    });

    history.replace("/users");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const url = "http://localhost:4001/api/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };
      const response = await fetch(url, options);

      const jsonData = await response.json();
      console.log("jsonData ==> ",jsonData);
      if (jsonData.status === true) {
        console.log("Login successful. Welcome back!")
        toast.success("Login successful. Welcome back!");
        this.onSubmitSuccess(jsonData);

        this.setState({ isLoading: false });
      }
    } catch (error) {
      toast.error("invalid username or password");
      this.onSubmitFailure("invalid username or password");
      this.setState({ isLoading: false });
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
    const { email } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL_ID
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
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
      return <Redirect to="/shops" />;
    }

    if (redirectToSignup) {
      return <Redirect to="/" />;
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
