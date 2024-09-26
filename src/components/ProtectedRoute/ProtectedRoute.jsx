import { Redirect, Route } from "react-router-dom";
import Cookie from "js-cookie";
import Header from "../Header/header";
import "./ProtectedRoute.css";

import AdminOne from "../AdminOne/AdminOne";
import Layout from "../Layout/Layout";
import HeaderBar from "../Layout/HeaderBar";
import Sidebar from "../Layout/Sidebar";
import { getUserDetails } from "../Utilities/Utilities";
import NotFound from "../NotFound";

const ProtectedRoute = ({ ...rest }) => {
  const jwtToken = Cookie.get("jwt_token");
  if (jwtToken === undefined) {
    return <Redirect to="/login" />;
  }
  const userRole = getUserDetails().usertype;

  // console.log(role);
  // Check if user role matches the required role for the route
  // if (userRole !== role) {
  //   // Redirect user to appropriate page (e.g., access denied page)
  //   return (
      
  //       <NotFound />
      
  //   );
  // }
  return (
    <div className="layout-container">
      <HeaderBar />
      <div className="sidebar-and-main-content">
        <Sidebar />
        <div className="main-container">
          <Route {...rest} />
        </div>
      </div>
    </div>
  );
};
export default ProtectedRoute;
