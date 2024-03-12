import { Link, withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import "./index.css";
import TabItem from "../TabItem/tabitem";

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
    { tabId: "SHOPOWNER", displayText: "shop-owner", to: "/shopowners" },

    //shop registration -form
    { tabId: "SHOP-REGISTRATION", displayText: "shop-registraion", to: "/shopregistrationForm" },

    // all the shops
    { tabId: "SHOPS", displayText: "shops", to: "/shops" },


  

  //barber application -form
  { tabId: "BARBER-APPLICATION", displayText: "BarberApplication", to: "/BarberApplicationsForm" },

    // all the barbers
    { tabId: "NO-OF-BARBERS", displayText: "NOOFBARBERS", to: "/noofbarbers" },



    // book the salon appointment -form
  { tabId: "BOOK-APPOINTMENT-FORM", displayText: "APPOINTMENT-FORM", to: "/appointment" },
    // all user bookings
    { tabId: "USERBOOKINGS", displayText: "USER-APPOINTMENTS", to: "/userbookings" },
  

    // barber registrat -form
    // { tabId: "BARBER-REGISTRATION", displayText: "Barberr-registraion", to: "/barberregistration" },

    // barber application -form

    // shop registration -form

    
  ];
  const LoginUserLogo = () => {
    return <p className="user-logo">{Cookies.get("logidin_user_logo")}</p>;
  };
  const onClickLogout = () => {
    const { history } = props;

    Cookies.remove("jwt_token");
    Cookies.remove("access_level");
    Cookies.remove("logidin_user_logo");
    history.replace("/login");
    localStorage.removeItem("activeTabId");
  };

  // const accessLevel = Cookies.get("access_level");
  const accessLevel = parseInt(Cookies.get("access_level"));

  let filteredTabsList = [];
  if (accessLevel === 3) {
    filteredTabsList = tabsList;
  } else if (accessLevel === 0 || accessLevel === 1) {
    filteredTabsList = tabsList.filter(
      (tab) => tab.tabId === "HOME" || tab.tabId === "BARBERS"
    );
  } else if (accessLevel === 2) {
    filteredTabsList = tabsList.filter((tab) => tab.tabId !== "APPROVALS");
  }
  return (
    <nav className="nav-headers">
      <div className="user-logo-container">{LoginUserLogo()}</div>
      <ul className="nav-tabs-menu-container">
        {filteredTabsList.map((tabDetails) => (
          <TabItem
            key={tabDetails.tabId}
            tabDetails={tabDetails}
            isActiveTabId={tabDetails.tabId === ActiveTabId}
            setActiveTabId={setActiveTabId}
          />
        ))}
        <li className="nav-menu-item">
          <button
            type="button"
            className="btn btn-warning"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Header);
