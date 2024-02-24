import { Link, withRouter } from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";

const Header = (props) => {
  const onClickLogout = () => {
    const { history } = props;

    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          {/* web site logo */}
          <img
            className="website-logo"
            src="https://as1.ftcdn.net/v2/jpg/02/89/96/84/1000_F_289968481_3fO0IEzzgxImqz2wc24Jql67pPpp6BS0.jpg"
            alt="website logo"
          />

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            {/* it should present */}
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-img"
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          {/* <img className="website-logo" src="" alt="website logo desk" /> */}
          <h1 className="websiteLogo">Logo</h1>
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
            className="logout-desktop-btn"
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
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png1"
                alt="nav home"
                className="nav-bar-img"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/admin" className="nav-link">
              <img
                src="admin Dashboard"
                alt="admin Dash board"
                className="nav-bar-img"
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Header);
