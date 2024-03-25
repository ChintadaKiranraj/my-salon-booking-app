import React, { useState } from "react";
// import "./BarberItem.css";
import "./BarberCard.css";
import { ImageDecoder } from "../../Utilities/Utilities";



const BarberItem = (props) => {
  const { barber, isViewMode } = props;
  const { profilephoto } = barber;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  let barberImg;
  if (profilephoto != null) {
    const { data } = profilephoto;
    barberImg = ImageDecoder(data);
  }
  console.log("barber:", barber);
  return (
    <li className= {isViewMode ?"barber-card-row":"barber-card"}>
      <div>
        <img src={barberImg} className={isViewMode ?"barber-image-row":"barber-image"} alt="img" />
      </div>
      <div className= {isViewMode ?"barber-details-row":"barber-details"}>
        <p>
          <strong>Name:</strong> {barber.firstname} {barber.lastname}
        </p>
        <p className="email">
          <strong>Email:</strong> {barber.email}
        </p>
        <p>
          <strong>Contact:</strong> {barber.phonenumber}
        </p>

        {isViewMode && (
          <>
            <p>
              <strong>Experience:</strong> {barber.experience}
            </p>
          </>
        )}
        <p className="description">
          <strong>Description:</strong>
          {!showFullDescription
            ? barber.description
            : `${barber.description.slice(0, 50)}...`}
        </p>

        <span onClick={toggleDescription} className="view-more">
          {showFullDescription ? "Show Less" : "View More"}
        </span>
      </div>
    </li>
  );
};
BarberItem.defaultProps = {
  isViewMode: false,
};
export default BarberItem;
