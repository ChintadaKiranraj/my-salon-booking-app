import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import "./AccountDropdown.css";
import UserAccount from "../UserAccount/UserAccount";

const AccountDropdown = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    console.log("Logout");
    Cookies.remove("jwt_token");
  };

  const handleChangePassword = () => {
    console.log("Change password");
    // need to Implement change password logic
  };

  const handleMyAccount = () => {
    console.log("My account");
    setShowModal(true);
  };

  return (
    <>
      <Dropdown className="account-action-dropdown">
        <Dropdown.Toggle
          variant="info "
          id="dropdown-basic"
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleMyAccount}>
            <UserAccount />
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
          <Dropdown.Item onClick={handleChangePassword}>
            Change password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default AccountDropdown;
