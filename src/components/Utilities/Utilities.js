import { Buffer } from "buffer";
import Spinner from "react-bootstrap/Spinner";
import { jwtDecode } from "jwt-decode";
import Cookie from "js-cookie";
// import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "js-cookie";
import "./Utilities.css";
export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const ImageDecoder = (data = "") => {
  const binaryData = Buffer.from(data).toString("base64");
  return atob(binaryData);
};

export const PopUPModel = ({ children }) => {
  return (
    <div className="popup-model-outer-container">
      <div className="popup-model-contents">{children}</div>
    </div>
  );
};

export const Loader = () => {
  return <Spinner animation="border" />;
};

export const LoginUserProfilePhoto = async () => {
  const jwtToken = Cookie.get("jwt_token");
  const userDetails = jwtDecode(jwtToken);
  const userId = userDetails.userid;
  console.log("userId At utils ==>  :", userId);
  let imageByteArrray = null;
  if (userId != null) {
    const response = await fetch(
      `http://localhost:4001/api/get-user-profile-photo/${userId}`
    );
    const responseData = await response.json();
    if (responseData.code === 200) {
      const { profilephoto } = responseData.data;
      const { data } = profilephoto;
      imageByteArrray = ImageDecoder(data);
    }
  }

  return imageByteArrray;
};

export const getUserDetails = () => {
  const jwtToken = Cookie.get("jwt_token");
  const userDetails = jwtDecode(jwtToken);
  return userDetails;
};

export const userInitials = () => {
  const userDetails = getUserDetails();
  const fullName = userDetails.firstname + " " + userDetails.lastname;
  const userInitials = fullName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  const email = userDetails.email;
  return (
    <div className="logo-email-container">
      <p className="user-logo">{userInitials}</p>
    </div>
  );
};

export const UsertFullName = () => {
  const userDetails = getUserDetails();
  const fullName = userDetails.firstname + " " + userDetails.lastname;

  return (
    <div className="logo-email-container">
      <p className="user-name">{fullName}</p>
    </div>
  );
};


export const UpdateProfilePhoto=async (base64Image)=>{
  const userDetails = getUserDetails();
  const userId = userDetails.userid;
  const response = await fetch(`http://localhost:4001/api/update-user-profile-photo/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profilePhoto: base64Image }),
  });
  const responseData = await response.json();
  if(responseData.code===200){
    return true;
  }
  return false;
  
}

