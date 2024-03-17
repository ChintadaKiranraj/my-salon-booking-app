import { Link, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import "./header.css";
import TabItem from "../TabItem/tabitem";
import AccountDropdown from "../AccountDropdown/AccountDropdown";

import { jwtDecode } from "jwt-decode";



export  const  LoginUserLogo = () => {
  const jwtToken = Cookies.get("jwt_token");
  const userDetails = jwtDecode(jwtToken);
const fullName = userDetails.full_name;
console.log("fullName", fullName);
  const userInitials = fullName.split(" ").map((word) => word.charAt(0)) .join("");
  const email = userDetails.email;
  return (
    <div className="logo-email-container">
     <p className="user-logo">{userInitials}</p>
      <p className="user-name">{fullName}</p>
    </div>
  );
};
const Header = (props) => {
  const [ActiveTabId, setActiveTabId] = useState("HOME");
  useEffect(() => {
    const storedTabId = localStorage.getItem("activeTabId");
    if (storedTabId) {
      setActiveTabId(storedTabId);
    }
  }, []);
 

  const tabsList = [
    //user registrations -form
    // { tabId: "USER-REGISTRATION", displayText: "user-regitration", to: "/RegistrationForm" },

    //will show the all the list of users
    { tabId: "USERS", displayText: "USERS", to: "/users" },

    //all the list of the shop owners
    { tabId: "SHOPOWNER", displayText: "SHOPOWNER", to: "/shopowners" },

    //shop registration -form
    {
      tabId: "SHOP-REGISTRATION",
      displayText: "SHOP-REGISTRATION",
      to: "/shopregistrationForm",
    },

    // all the shops
    { tabId: "SHOPS", displayText: "SHOPS", to: "/shops" },

    //barber application -form
    {
      tabId: "BARBER-APPLICATION",
      displayText: "BARBER-APPLICATION",
      to: "/BarberApplicationsForm",
    },

    // all the barbers
    {
      tabId: "NO-OF-BARBERS",
      displayText: "NO-OF-BARBERS",
      to: "/noofbarbers",
    },

    // book the salon appointment -form
    {
      tabId: "BOOK-APPOINTMENT-FORM",
      displayText: "APPOINTMENT-FORM",
      to: "/appointment",
    },
    // all user bookings
    {
      tabId: "USERBOOKINGS",
      displayText: "USER-APPOINTMENTS",
      to: "/userbookings",
    },

    // barber registrat -form
    // { tabId: "BARBER-REGISTRATION", displayText: "Barberr-registraion", to: "/barberregistration" },

    // barber application -form

    // shop registration -form
  ];
  
  // const onClickLogout = () => {
  //   const { history } = props;

  //   Cookies.remove("jwt_token");
  //   Cookies.remove("access_level");
  //   Cookies.remove("logidin_user_logo");
  //   history.replace("/login");
  //   localStorage.removeItem("activeTabId");
  // };

  return (
    <nav className="nav-headers">
      {/* <div className="user-logo-dropdown">{LoginUserLogo()}
      <AccountDropdown /></div> */}
     
      <ul className="nav-tabs-menu-container">
        {tabsList.map((tabDetails) => (
          <TabItem
            key={tabDetails.tabId}
            tabDetails={tabDetails}
            isActiveTabId={tabDetails.tabId === ActiveTabId}
            setActiveTabId={setActiveTabId}
          />
        ))}
        
      </ul>
    </nav>
  );
};

export default withRouter(Header);
