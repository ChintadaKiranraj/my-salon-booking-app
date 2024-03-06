import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import SignupForm from "./components/SignupForm";
import Barbars from "./components/Barbars";
import ViewOnly from "./components/Viewonly";

// import MyComponent from "./ConfirmationModal/confirmation";
import "./App.css";
import Approvals from "./components/Approvals/Approvals";
import Header from "./components/Header";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import myProfilePick from "./Images/loginbg.svg";
import myProfilePick2 from "./Images/profile.svg";
import Homepage from "./components/Homepage/Homepage";
import Barber from "./components/Barbars";
import Bookings from "./components/Bookings";
import UserBookings from "./components/UserBookings/userbookings";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        {/* <img alt="profilePick" src={myProfilePick2} id="profilepic" /> */}

        {/* <Route exact path="/login" component={LoginForm} />
        <Route exact path="/registartion" component={SignupForm} />
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/admin" component={Admin} />
        <ProtectedRoute exact path="/barbers" component={Barbars} />
        <ProtectedRoute exact path="/approvals" component={Approvals} />
        <ProtectedRoute exact path="/user" component={ViewOnly} /> */}
        {/* <Route path="/not-found" component={NotFound} /> */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register/shop-owner" component={SignupForm} />
        <Route exact path="/register/customer" component={SignupForm} />
        <ProtectedRoute exact path="/home" component={Barber} />
        <ProtectedRoute exact path="/shop/schedules" component={Bookings} />
        <ProtectedRoute exact path="/user/schedules" component={UserBookings} />

        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
