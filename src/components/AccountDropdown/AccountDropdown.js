// import Dropdown from "react-bootstrap/Dropdown";
// import Cookies from "js-cookie";
// import "./AccountDropdown.css";
// const AccountDropdown = () => {
//   const handleLogout = (props) => {
//     console.log("Logout");
//     const { history } = props;

//     Cookies.remove("jwt_token");
//   };

//   const handleChangePassword = () => {
//     // Handle change password logic here
//     console.log("Change password");
//   };

//   const handleMyAccount = () => {
//     // Handle my account logic here
//     console.log("My account");
//   };
//   return (
//     <Dropdown className="account-action-dropdown">
//       <Dropdown.Toggle variant="primary" id="dropdown-basic"></Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1" onClick={handleMyAccount}>
//           My account
//         </Dropdown.Item>
//         <Dropdown.Item href="#/action-2" onClick={handleLogout}>
//           Log out
//         </Dropdown.Item>
//         <Dropdown.Item href="#/action-3" onClick={handleChangePassword}>
//           Change password
//         </Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };

// export default AccountDropdown;
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import "./AccountDropdown.css";
import OffcanvasCoponent from "../Offcanvas/Offcanvas";

const AccountDropdown = () => {
  const [showModal, setShowModal] = useState(false); 

  const handleLogout = () => {
    console.log("Logout");
    Cookies.remove("jwt_token");
  };

  const handleChangePassword = () => {
    console.log("Change password");
    // Implement change password logic
  };

  const handleMyAccount = () => {
    console.log("My account");
    setShowModal(true); // Show modal when "My account" is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });

  const handleClick = (event) => {
    setClickCoordinates({ x: event.clientX, y: event.clientY });
  };
  return (
    <>
      <Dropdown className="account-action-dropdown">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          
        </Dropdown.Toggle>

        <Dropdown.Menu>
        {/* href="#/action-2"  */}
          <Dropdown.Item onClick={handleMyAccount}>
          <OffcanvasCoponent/>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>
            Log out
          </Dropdown.Item>
          <Dropdown.Item  onClick={handleChangePassword}>
            Change password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    
      
    </>
  );
};

export default AccountDropdown;
