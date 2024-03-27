import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./components/NotFound";
import SignupForm from "./components/SignupForm";
import Barbars from "./components/BarberManagement/Barber/Barber";
import ViewOnly from "./components/Viewonly";


import "./App.css";
import Approvals from "./components/Approvals/Approvals";
import Header from "./components/Header/header";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Barber from "./components/BarberManagement/Barber/Barber";
import BarberApplicationsForm from "./components/BarberManagement/ApplicationForm/ApplicationForm";
import BarberApplicationData from "./components/BarberManagement/ApplicationsList/ApplicationsList";
import BarberRegistrationForm from "./components/BarberManagement/RegistrationForm/RegistrationForm";
import Bookings from "./components/Bookings";
import Shops from "./components/Shops/ShopsList/ShopsList";
import ShopOwners from "./components/Shops/ShopOwners/shopowner";
import Users from "./components/UserManagment/Users/users";
// import Appointment from "./components/Appointment/appointment";

import ShopRegistrationForm from "./components/Shops/ShopRegistrationForm/shopregistrationform";

import Welcome from "./components/Welcome/Welcome";
import AdminOne from "./components/AdminOne/AdminOne";

import ShpoRegistraction from "./components/ShopsTwo/shopTwo";

// import BookedAppointments from "./components/BookedAppointments";
import EditShopsData from "./components/Shops/EditShops/EditShopsData";
import MyAppointments from "./components/UserManagment/MyAppointments/MyAppointments";
import Appointment from "./components/UserManagment/AppointmentForm/appointment";






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
        // <ProtectedRoute exact path="/user" component={ViewOnly} /> */}
        {/* <Route path="/not-found" component={NotFound} /> */}
        {/* <ProtectedRoute exact path="/barberregistration" component={UserBookings} /> */}
        {/* <ProtectedRoute exact path="/user/schedules" component={UserBookings} /> */}
      
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/user" component={ViewOnly} /> 
        <ProtectedRoute exact path="/shops" component={Shops} />
        <ProtectedRoute exact path="/shopowners" component={ShopOwners} />
        <ProtectedRoute exact path="/users" component={Users} />
        <ProtectedRoute exact path="/noofbarbers" component={Barber} />
        {/* <ProtectedRoute exact path="/userbookings" component={Bookings} /> */}
        
        <ProtectedRoute exact path="/barberregistration" component={BarberRegistrationForm} />
        <ProtectedRoute exact path="/shopregistrationForm" component={ShopRegistrationForm} />
        <ProtectedRoute exact path="/BarberApplicationsForm" component={BarberApplicationsForm} />
        <ProtectedRoute exact path="/admin-tabs" component={AdminOne} />
        <ProtectedRoute exact path="/BarberApplicationData" component={BarberApplicationData} />
        <ProtectedRoute exact path="/ShpoRegistraction" component={ShpoRegistraction} />
        <ProtectedRoute exact path="/Appointment" component={Appointment} />
        <ProtectedRoute exact path="/Bookings" component={Bookings} />
        <ProtectedRoute exact path="/MyAppointments" component={MyAppointments} />
        <Route component={NotFound} />
      </Switch>
     
    </div>
  </Router>
);

export default App;
