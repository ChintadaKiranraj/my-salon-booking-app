import "./tabitem.css";
import { Link } from "react-router-dom";

const TabItem = (props) => {
  const { tabDetails, isActiveTabId, setActiveTabId } = props;
  const { to, tabId } = tabDetails;

  const isActive = isActiveTabId ? "active-tab-btn" : "";

  const onClickTabItem = () => {
    setActiveTabId(tabId);
    localStorage.setItem("activeTabId", tabId);
  };

  return (
    <li className={`nav-menu-item ${isActive}`} onClick={onClickTabItem}>
      <Link to={to} className={`nav-link-items  ${isActive}`}>
        {tabDetails.displayText}
      </Link>
    </li>
  );
};

export default TabItem;
