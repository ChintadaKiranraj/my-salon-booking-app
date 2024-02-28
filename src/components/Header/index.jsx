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
        <div className="nav-bar-mobile-logo-container">
          {LoginUserLogo()}
          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <LuLogOut />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <div className="user-logo-container">{LoginUserLogo()}</div>
          <ul className="nav-menu">
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
          </ul>
          <button
            type="button"
            className="logout-desktop-btn btn btn-warning"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
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
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Header);
