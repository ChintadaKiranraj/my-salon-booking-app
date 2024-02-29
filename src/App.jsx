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
import PopupExample from "./components/ReactPopUps"
import "./App.css";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/registartion" component={SignupForm} />
        <ProtectedRoute exact path="/admin" component={Admin} />
        <ProtectedRoute exact path="/barbars" component={Barbars} />
        <ProtectedRoute exact path="/user" component={ViewOnly} />
       
        <Route path="/11" component={PopupExample} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
