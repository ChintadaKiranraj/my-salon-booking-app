import { useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
const ServiceCard = (props) => {
  const [shoFullDiscription, setShowFullDescription] = useState(false);
  const { service } = props;
  const { id, servicename, description, icons } = service;

  return (
    <>
      <li>
        <div className="service-card">
          <div className="service-card-content-container">
            <h3 className="card-title">{servicename}</h3>
<img src={icons} className="icons"/>
            <p className="card-text">
              {shoFullDiscription
                ? description
                : `${description.slice(0, 100)}...`}
            </p>
          </div>

          <div className="service-card-btn-container">
            <FaCircleArrowRight className="card-btn" />
          </div>
        </div>
      </li>
    </>
  );
};

export default ServiceCard;
