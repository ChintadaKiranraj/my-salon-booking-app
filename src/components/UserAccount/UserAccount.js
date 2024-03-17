import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./UserAccount.css";
import logopng from "../../assets/images/six.jpg";
const  UserAccount=()=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p variant="success" onClick={handleShow}>
        MyAccount
      </p>

      <Offcanvas show={show} onHide={handleClose}  placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MyAccount</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div class="user-card">
            <div class="title-profile">
              <h5 class="card-title">Kiranraj</h5>
              <img src={logopng} alt="User Logo" class="user-profile-logo" />
            </div>
            <div class="user-info">
              <p class="card-text">
                <span class="highlight">Email:</span>
                Kiranraj.chintada@epsoftinc.com
              </p>
              <p class="card-text">
                <span class="highlight">Phone:</span> 7893558435
              </p>
              <p class="card-text">
                <span class="highlight">Address:</span> Hyderabad kukatpally
              </p>
              <p class="card-text">
                <span class="highlight">Role:</span> Admin
              </p>
              <p class="card-text">
                <span class="highlight">User Type:</span> Shop Owner
              </p>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default UserAccount;
