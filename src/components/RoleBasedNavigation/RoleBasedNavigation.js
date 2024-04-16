import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./RoleBasedNavigation.css";

import { RiAdminLine } from "react-icons/ri";
import {
  User,
  getUserDetails,
  Barber,
  ShopOwner,
} from "../Utilities/Utilities";
const AdminOne = () => {
  const userDetails = getUserDetails();

  return (
    <ul className="admin-sidebar-tabs">
      {userDetails.user_type === ShopOwner() && (
        <>
          <li>
            <NavLink to="/noofbarbers" className="ul--li-a">
              My Staff
            </NavLink>
          </li>
          <li>
            <NavLink to="/shops" className="ul--li-a">
              My Shops
            </NavLink>
          </li>

          <li>
            <NavLink to="/BarberApplicationData" className="ul--li-a">
              job Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="/Bookings" className="ul--li-a">
              Pending Appointments
            </NavLink>
          </li>
        </>
      )}

      {userDetails.user_type === Barber() && (
        <>
          <li>
            <NavLink to="/BarberApplicationsForm" className="ul--li-a">
              Barber Application
            </NavLink>
          </li>
          <li>
            <NavLink to="/BarberApplicationData" className="ul--li-a">
              My job Application
            </NavLink>
          </li>
        </>
      )}
      {userDetails.user_type === User() && (
        <>
          <li>
            <NavLink to="/Appointment" className="ul--li-a">
              Book an Appointment Form
            </NavLink>
          </li>
          <li>
            <NavLink to="/MyAppointments" className="ul--li-a">
              My Appointment
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default AdminOne;
