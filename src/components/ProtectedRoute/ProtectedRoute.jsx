import { Redirect, Route } from "react-router-dom";
import Cookie from "js-cookie";
import Header from "../Header/header";
import "./ProtectedRoute.css";

import AdminOne from "../AdminOne/AdminOne";
import Layout from "../Layout/Layout";
import Header1 from "../Layout/Header1";
import Sidebar from "../Layout/Sidebar";

const ProtectedRoute = (props) => {
  const jwtToken = Cookie.get("jwt_token");
  if (jwtToken === undefined) {
    return <Redirect to="/login" />;
  }
 
  return (
    <div className="layout-container">
      <Header1 />
      <div className="sidebar-and-main-content">
     
        <Sidebar />
        <div className="main-container">
        
        <Route {...props} />
        </div>
      </div>
    </div>
  );
};
export default ProtectedRoute;
