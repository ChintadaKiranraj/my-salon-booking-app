import AccountDropdown from "../AccountDropdown/AccountDropdown";

import UserProfilePick from "../UserManagment/UserAccount/UserProfilePick/UserProfilePick";
import { UsertFullName } from "../Utilities/Utilities";
import { BarberLogoTitle } from "../Welcome/Welcome";
import "./Layout.css";

const HeaderBar = () => {
  return (
    <div className="horizontal-header">
      <div className="user-logo-dropdown-header">
        <BarberLogoTitle />
        <div className="logoand-account-details">
          <>
            <UserProfilePick />
            <UsertFullName />
          </>

          <AccountDropdown />
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
