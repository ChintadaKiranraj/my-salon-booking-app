import { useEffect, useState, useRef } from "react";
// import React, { useState, useRef } from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";
import "./UserAccount.css";
import { LiaUserEditSolid } from "react-icons/lia";
import {
  LoginUserProfilePhoto,
  getUserDetails,
} from "../../Utilities/Utilities";
import UserProfilePick from "./UserProfilePick/UserProfilePick";
const UserAccount = () => {
  const userDetails = getUserDetails();

  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [editUserData,setEditUserData]=useState({firstName:"",lastName:"",phoneNumber:""});  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchUserProfile = async () => {
    const userProfile = await LoginUserProfilePhoto();

    return userProfile;
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const ediUserProfile = () => {
    console.log("Edit user profile clicked");
    setEditUser(true);
  };

  const UserCard = () => {
    return (
      <div className="user-card">
        <div className="title-profile-container">
          <h5 className="user-full-name">
            {userDetails.firstname + " " + userDetails.lastname}
          </h5>
          <UserProfilePick />
        </div>

        <div className="user-info-card">
          <div className="user-info-item">
            <span className="highlight">Email:</span>
            <span>{userDetails.email}</span>
          </div>
          <div className="user-info-item">
            <span className="highlight">Phone:</span>
            <span>{userDetails.phonenumber}</span>
          </div>
          {/* <div className="user-info-item">
            <span className="highlight">Address:</span>
            <span>Hyderabad, Kukatpally</span>
          </div> */}
          <div className="user-info-item">
            <span className="highlight">Role:</span>
            <span>{userDetails.usertype}</span>
          </div>
          <div className="user-info-item">
            <span className="highlight">User ID:</span>
            <span>{userDetails.userid}</span>
          </div>
        </div>
      </div>
    );
  };

const onChangeInput = (event) => {

  const { name, value } = event.target;
  console.log(name, value)
  setEditUserData({
    ...editUserData,
    [name]: value,
  });
}
  const EditUserCard = () => {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <label>First Name</label>
            <input type="text" onChange={onChangeInput}  name="firstName" value={editUserData.firstName}/>
          </div>
          <div className="col-6">
            <label>First Name</label>
            <input type="text" onChange={onChangeInput} name="lastName"value={editUserData.lastName}/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label>Phone Number</label>
            <input type="text" onChange={onChangeInput}  name="phoneNumber"value={editUserData.phoneNumber}/>
          </div>
        
        </div>

        <button type="submit">Update</button>
        <button  className="m-3"
          onClick={() => {
            setEditUser(false);
          }}
        >
          Cancle
        </button>
      </div>
    );
  };
  return (
    <>
      <p variant="success" onClick={handleShow} className="drop-down-item">
        MyAccount
      </p>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <div className="account-title-Edit-icon-container">
            <h5>MyAccount</h5>
            {/* <LiaUserEditSolid
              className={
                !editUser ? "edit-user-account" : "edit-user-account-active"
              }
              onClick={ediUserProfile}
              title="Edit Accout"
            /> */}
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body className="p-5">
          { <UserCard />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserAccount;
