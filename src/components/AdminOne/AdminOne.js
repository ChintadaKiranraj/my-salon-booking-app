import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./AdminOne.css";

import { RiAdminLine } from "react-icons/ri";
import { getUserDetails } from "../Utilities/Utilities";
const AdminOne = () => {
  const userDetails = getUserDetails();

  return (
    <ul className="admin-sidebar-tabs">
      {userDetails.usertype === "Shop Owner" && (
        <>
          <li>
            <NavLink to="/noofbarbers" className="ul--li-a">
              My shop Barbers
            </NavLink>
          </li>
          <li>
            <NavLink to="/shops" className="ul--li-a">
             My Shops
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/BarberApplicationData" className="ul--li-a">
             job  Requests
            </NavLink>
          </li>
          <li>
        <NavLink to="/Bookings" className="ul--li-a">
        Pending Appointments
        </NavLink>
      </li>
        </>
      )}

      { userDetails.usertype === "Barber" && (
        <>
        <li>
        <NavLink to="/BarberApplicationsForm" className="ul--li-a">
          Barber Application
        </NavLink>
      </li>
      <li>
        <NavLink to="/BarberApplicationsForm" className="ul--li-a">
          My  job Application
        </NavLink>
      </li>
        </>
      )}
       { userDetails.usertype === "User" && (
        <>
        <li>
        <NavLink to="/Appointment" className="ul--li-a">
           Book an Appointment Form
        </NavLink>
      </li>
      <li>
        <NavLink to="/MyAppointments" className="ul--li-a">
          My  Appointment
        </NavLink>
      </li>
        </>
      )}

      {/* <li>
        <NavLink to="/users" className="ul--li-a">
          Users
        </NavLink>
      </li> */}

      {/* <li>
        <NavLink to="/BarberApplicationsForm" className="ul--li-a">
          Barber Application
        </NavLink>
      </li> */}

     

      {/* <li>
        <NavLink to="/BookedAppointments" className="ul--li-a">
        BookedAppointments
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink to="/BookingFormTwo" className="ul--li-a">
        Book Appointment
        </NavLink>
      </li> */}

      {/* <li>
        <NavLink to="/ShpoRegistraction" className="ul--li-a">
          Shpo Registractionaaaaaa
        </NavLink>
      </li> */}

      {/* <li>
        <NavLink to="/BookingFormTwo" className="ul--li-a">
          BookingFormTwo
        </NavLink>
      </li> */}
    </ul>
  );
};

export default AdminOne;
