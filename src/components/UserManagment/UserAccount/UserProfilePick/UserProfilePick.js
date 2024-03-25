import React from "react";
import { useEffect, useState, useRef } from "react";
import { FiCamera } from "react-icons/fi";
import {
  LoginUserProfilePhoto,
  UpdateProfilePhoto,
  toBase64,
} from "../../../Utilities/Utilities";
import "./UserProfilePick.css";

const UserProfilePick = () => {
  const [userProfilePhoto, setUserProfilePhoto] = useState(null);

  const handleChooseFileClick = () => {
    console.log("Choose file clicked");
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64Img = await toBase64(file);
      console.log("base64ImgXXXX", base64Img);
      await UpdateProfilePhoto(base64Img);

      setUserProfilePhoto(base64Img);
    }
  };

  const fetchUserProfilePhoto = async () => {
    const userProfile = await LoginUserProfilePhoto();
    setUserProfilePhoto(userProfile);
    // UpdateProfilePhoto(userProfile)
  };

  useEffect(() => {
    fetchUserProfilePhoto();
  }, []);
  return (
    <div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={userProfilePhoto}
          alt="User Logo"
          className="user-profile-pick"
          //   style={{ borderRadius: "50%", width: "80px", height: "80px" }}
        />
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />

        <div onClick={handleChooseFileClick} className="profile-photo-overlay">
          <FiCamera />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePick;
