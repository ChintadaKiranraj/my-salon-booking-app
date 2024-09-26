// import React, { useState } from "react";
// import "./index.css";
// import shopImg from "../../assets/images/nine.jpg";
// import { ImageDecoder } from "../Shops/ShopsList/shops";
// const BarberItem = ({ barber }) => {
//   const { profilephoto } = barber;
//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const toggleDescription = () => {
//     setShowFullDescription(!showFullDescription);
//   };
//   let barberImg;
//     if(profilephoto!=null){
//       const {data}= profilephoto
//       barberImg=ImageDecoder(data);
//     }
//   console.log("barber:", barber);
//   return (
//     <li className="barber-card">
//   <div>
//     <img src={barberImg} className="barber-image" alt="img" />
//   </div>
//   <div className="barber-details">
//     <p><strong>Name:</strong> {barber.firstname} {barber.lastname}</p>
//     <p className="email"><strong>Email:</strong> {barber.email}</p>
//     <p><strong>Contact:</strong> {barber.phonenumber}</p>
//     {/* <p><strong>Description:</strong> {barber.description}</p> */}
//     <p><strong>Description:</strong> 
//         {showFullDescription ? barber.description : `${barber.description.slice(0, 50)}...`}
//       </p>
//       <span onClick={toggleDescription} className="view-more">
//         {showFullDescription ? 'Show Less' : 'View More'}
//       </span>
//   </div>
// </li>
//   );
// };

// export default BarberItem;
