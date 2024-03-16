import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./AdminOne.css";

const AdminOne = () => {
  return (
   
      <ul className="admin-header-nav-bar">
        <li>
          <NavLink to="/noofbarbers">Barbers</NavLink>
        </li>
        <li>
          <NavLink to="/shops">Shops</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
        <li>
          <NavLink to="/userbookings">userbookings</NavLink>
        </li>
        <li>
          <NavLink to="/BarberApplicationsForm">BarberApplicationsForm</NavLink>
        </li>
      </ul>
   
  );
};

export default AdminOne;
