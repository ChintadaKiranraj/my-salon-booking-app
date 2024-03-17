// import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import "./Layout.css";
// import { FaUser } from "react-icons/fa";
// import AdminOne from "../AdminOne/AdminOne";
// import { useState } from "react";
// const Sidebar = () => {
//   const [isAdminVisible, setIsAdminVisible] = useState(false);
//   const isAdminClicked = () => {
//     console.log("Admin clicked");
//     setIsAdminVisible(!isAdminVisible);
//   };
//   return (
//     <div className="Sidebar">
//       <span onClick={isAdminClicked}  className="admin-icon"><FaUser/>Admin</span>

//       {isAdminVisible && <AdminOne />}
//     </div>
//   );
// };

// export default Sidebar;
import { NavLink } from "react-router-dom";
import "./Layout.css";
import { FaUser } from "react-icons/fa";
import AdminOne from "../AdminOne/AdminOne";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isAdminVisible, setIsAdminVisible] = useState(false);

  useEffect(() => {
    // Retrieve isAdminVisible state from localStorage on component mount
    const storedIsAdminVisible = localStorage.getItem('isAdminVisible');
    if (storedIsAdminVisible) {
      setIsAdminVisible(JSON.parse(storedIsAdminVisible));
    }
  }, []);

  const isAdminClicked = () => {
    setIsAdminVisible(!isAdminVisible);
    // Store isAdminVisible state in localStorage
    localStorage.setItem('isAdminVisible', JSON.stringify(!isAdminVisible));
  };

  return (
    <div className="Sidebar">
      <span onClick={isAdminClicked} className="admin-icon"><FaUser/>Admin</span>
      {isAdminVisible && <AdminOne />}
    </div>
  );
};

export default Sidebar;
