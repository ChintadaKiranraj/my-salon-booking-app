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
const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/registartion" component={SignupForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/admin" component={Admin} />
        <ProtectedRoute exact path="/barbers" component={Barbars} />
        <ProtectedRoute exact path="/approvals" component={Approvals} />
        <ProtectedRoute exact path="/user" component={ViewOnly} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  </Router>
);

export default App;
