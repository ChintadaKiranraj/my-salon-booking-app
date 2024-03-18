import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./AdminOne.css";

const AdminOne = () => {
  return (
   
      <ul className="admin-sidebar-tabs">
        <li>
          <NavLink to="/noofbarbers" className="ul--li-a">Barbers</NavLink>
        </li>
        <li>
          <NavLink to="/shops" className="ul--li-a">Shops</NavLink>
        </li>
        <li>
          <NavLink to="/users" className="ul--li-a">Users</NavLink>
        </li>
        <li>
          <NavLink to="/userbookings" className="ul--li-a">Salon Appointments</NavLink>
        </li>
        <li>
          <NavLink to="/BarberApplicationsForm" className="ul--li-a">Barber Application</NavLink>
        </li>
        <li>
          <NavLink to="/BarberApplicationData" className="ul--li-a">Requests</NavLink>
        </li>
       
        {/* <li>
          <NavLink to="/ShpoRegistraction" className="ul--li-a">Shpo Registraction</NavLink>
        </li> */}

        
        {/* <li>
          <NavLink to="/ShopRegistrationForm" className="ul--li-a"> Shop RegistrationForm</NavLink>
        </li> */}
       
       
      </ul>
   
  );
};

export default AdminOne;
