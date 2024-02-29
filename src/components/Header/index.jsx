import { Link, withRouter } from "react-router-dom";

import Cookies from "js-cookie";
import { FcVoicePresentation } from "react-icons/fc";
import { RxHome } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";

import "./index.css";

const Header = (props) => {
  const LoginUserLogo = () => {
    return <p className="user-logo">{Cookies.get("logidin_user_logo")}</p>;
  };
  const onClickLogout = () => {
    const { history } = props;

    Cookies.remove("jwt_token");
    Cookies.remove("access_level");
    Cookies.remove("logidin_user_logo");
    history.replace("/login");

    const tabStyle = "yellow";
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-large-container">
          <ul className="nav-menu">
          <li className="nav-menu-item">
          <li className="user-logo-container">{LoginUserLogo()}</li>
            </li>

            <div className="nav-tabs">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/barbars" className="nav-link">
                Barbars
              </Link>
            </li>
            </div>
           
            <li className="nav-menu-item">
            <button
            type="button"
            className="btn btn-warning"
            onClick={onClickLogout}
          >
            Logout
          </button>
            </li>
          
          </ul>
          
        </div>
      </div>
      {/* <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
        <li className="user-logo-container">
        <div>{LoginUserLogo()}</div> 
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <RxHome />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/admin" className="nav-link">
              <FcVoicePresentation />
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/barbars" className="nav-link">
              Barbars
            </Link>
          </li>
          <li className="nav-menu-item">
          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <LuLogOut />
          </button>
          </li>
        </ul>
      </div> */}
    </nav>
  );
};

export default withRouter(Header);
