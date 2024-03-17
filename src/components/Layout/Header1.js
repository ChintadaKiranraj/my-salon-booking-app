import AccountDropdown from "../AccountDropdown/AccountDropdown";
import { LoginUserLogo } from "../Header/header";
import { BarberLogoTitle } from "../Welcome/Welcome";
import "./Layout.css";

const Header1 = () => {
  return (
    <div className="horizontal-header">
      <div className="user-logo-dropdown-header">
        <BarberLogoTitle />
        <div className="logoand-account-details">
          <LoginUserLogo />
          <AccountDropdown />
        </div>
      </div>
    </div>
  );
};

export default Header1;
