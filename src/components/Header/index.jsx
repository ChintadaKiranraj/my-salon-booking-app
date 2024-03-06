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
    { tabId: "HOME", displayText: "Barber Management", to: "/home" },
    {
      tabId: "BOOKING-DETAILS",
      displayText: "Shop Schedule",
      to: "/shop/schedules",
    },

    { tabId: "USER", displayText: "My_Bookings", to: "/user/schedules" },
    { tabId: "ADMIN", displayText: "USER", to: "/admin" },
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
