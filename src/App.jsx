import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./components/NotFound";
import ViewOnly from "./components/Viewonly";
import "./App.css";
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
import ShopRegistrationForm from "./components/Shops/ShopRegistrationForm/shopregistrationform";
import Welcome from "./components/Welcome/Welcome";
import AdminOne from "./components/AdminOne/AdminOne";
import ShpoRegistraction from "./components/ShopsTwo/shopTwo";
import MyAppointments from "./components/UserManagment/MyAppointments/MyAppointments";
import Appointment from "./components/UserManagment/AppointmentForm/appointment";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/user" component={ViewOnly} /> 
        <ProtectedRoute exact path="/shops" component={Shops} />
        <ProtectedRoute exact path="/shopowners" component={ShopOwners} />
        <ProtectedRoute exact path="/users" component={Users} />
        <ProtectedRoute exact path="/noofbarbers" component={Barber} />
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
