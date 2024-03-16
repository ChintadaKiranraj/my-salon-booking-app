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
import Header from "./components/Header/header";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import myProfilePick from "./Images/loginbg.svg";
import myProfilePick2 from "./Images/profile.svg";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import Barber from "./components/Barbars";
import Bookings from "./components/Bookings";
import UserBookings from "./components/UserBookings/userbookings";
import RegistrationForm from "./components/RegistrationForm/registrationform";
import Shops from "./components/Shops/shops";
import ShopOwners from "./components/ShopOwners/shopowner";
import Users from "./components/Users/users";
import Appointment from "./components/Appointment/appointment";
import BarberRegistrationForm from "./components/BarberRegistrationForm/barberregistrationform";
import ShopRegistrationForm from "./components/ShopRegistrationForm/shopregistrationform";
import BarberApplicationsForm from "./components/BarberApplicationsForm/BarberApplicationsForm";
import Welcome from "./components/Welcome/Welcome";
import AdminOne from "./components/AdminOne/AdminOne";
  

const App = () => (
  <Router>
    <div className="App">
      <Switch>
      {/* <ProtectedRoute exact path="/home" component={Home} /> */}
        {/* <img alt="profilePick" src={myProfilePick2} id="profilepic" /> */}

        {/* <Route exact path="/login" component={LoginForm} />
        <Route exact path="/registartion" component={SignupForm} />
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/admin" component={Admin} />
        <ProtectedRoute exact path="/barbers" component={Barbars} />
        <ProtectedRoute exact path="/approvals" component={Approvals} />
        <ProtectedRoute exact path="/user" component={ViewOnly} /> */}
        {/* <Route path="/not-found" component={NotFound} /> */}
        {/* <ProtectedRoute exact path="/barberregistration" component={UserBookings} /> */}
        {/* <ProtectedRoute exact path="/user/schedules" component={UserBookings} /> */}
      
        <Route exact path="/" component={Welcome} />
        {/* <Route exact path="/" component={WelcomePage} /> */}
        <Route exact path="/login" component={LoginForm} />
        {/* <Route exact path="/RegistrationForm" component={RegistrationForm} /> */}
       
        <ProtectedRoute exact path="/shops" component={Shops} />
        <ProtectedRoute exact path="/shopowners" component={ShopOwners} />
        <ProtectedRoute exact path="/users" component={Users} />

        <ProtectedRoute exact path="/noofbarbers" component={Barber} />
      
        <ProtectedRoute exact path="/userbookings" component={Bookings} />
        <ProtectedRoute exact path="/appointment" component={Appointment} />
        <ProtectedRoute exact path="/barberregistration" component={BarberRegistrationForm} />
        <ProtectedRoute exact path="/shopregistrationForm" component={ShopRegistrationForm} />
        <ProtectedRoute exact path="/BarberApplicationsForm" component={BarberApplicationsForm} />
        <ProtectedRoute exact path="/admin-tabs" component={AdminOne} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
