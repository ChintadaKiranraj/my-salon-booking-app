import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./tabitem.css";

const TabItem = (props) => {
  const { tabDetails } = props;
  const { to } = tabDetails;

  return (
    
    <li>
      <NavLink to={to}>{tabDetails.displayText}</NavLink>
      
    </li>
  );
};

export default TabItem;
