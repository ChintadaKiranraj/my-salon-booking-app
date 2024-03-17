// Filename - components/Sidebar.js



// import React, { useState } from "react";
// import styled from "styled-components";
// import { Link,NavLink } from "react-router-dom";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
// // import { SidebarData } from "./SidebarData";
// // import SubMenu from "./SubMenu";
// import { IconContext } from "react-icons/lib";
// import { LoginUserLogo } from "../Header/header";
// import AccountDropdown from "../AccountDropdown/AccountDropdown";
// import "./Sidebar.css";
// import { SidebarData } from "./SidebarData";
// import SubMenu from "./SubMenu";
// const Nav = styled.div`
//   background: #15171c;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const SidebarNav = styled.nav`
//   background: #15171c;
//   width: 250px;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
//   transition: 350ms;
//   z-index: 10;
// `;

// const SidebarWrap = styled.div`
//   width: 100%;
// `;

// const Sidebar = () => {
//   const [sidebar, setSidebar] = useState(false);

//   const showSidebar = () => setSidebar(!sidebar);
// const getAdminTabs=()=>{
//     console.log("Admin Tabs");
// }
//   return (
//     <>
//       <IconContext.Provider value={{ color: "#fff" }}>
//         <Nav className="nav-head">
//           <NavIcon to="#">
//             <FaIcons.FaBars onClick={showSidebar} />
//           </NavIcon>

//           <div className="user-logo-dropdown">
//             {<LoginUserLogo />}
//             <AccountDropdown />
//           </div>
//         </Nav>

        
//         <SidebarNav sidebar={sidebar}>
//           <SidebarWrap>
//             <NavIcon to="#">
//               <AiIcons.AiOutlineClose onClick={showSidebar} />
//             </NavIcon>
          
//             <NavLink to="/admin-tabs">Admin</NavLink>
    
//           </SidebarWrap>
//         </SidebarNav>
//       </IconContext.Provider>
//     </>
//   );
// };

// export default Sidebar;




