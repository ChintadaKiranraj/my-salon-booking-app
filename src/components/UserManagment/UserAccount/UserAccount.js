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
          <div className="user-info-item">
            <span className="highlight">Address:</span>
            <span>Hyderabad, Kukatpally</span>
          </div>
          <div className="user-info-item">
            <span className="highlight">User Type:</span>
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
  const EditUserCard = () => {
    return (
      <div>
        <h1>Edit user card bdetails</h1>
        <button type="submit">Update</button>
        <button
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
          <div className="Account-title-Edit-icon-container">
            <h5>MyAccount</h5>
            {/* onClick={ediUserProfile}  */}
            <LiaUserEditSolid className="edit-icon-style" onClick={ediUserProfile}/>
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {editUser ? <EditUserCard /> : <UserCard />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserAccount;
