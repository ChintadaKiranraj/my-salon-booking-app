import { useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";
import ViewServiceCard from "./ViewServiceCard/ViewServiceCard";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
const ServiceCard = (props) => {
 
  const { service } = props;
  console.log(service,"at the servies Service card")
  const { servicename, description, icons ,serviceid} = service;
  const [shoFullDiscription, setShowFullDescription] = useState(false);

  
  return (

   
    <NavLink key={serviceid} to={`/service-description/${serviceid}`} className="description-nave-link" style={{ textDecoration: 'none' }} >
      <li>
        <div className="service-card">
          <div className="service-card-content-container">
            <h3 className="card-title">{servicename}</h3>
            <img src={icons} className="service-card-img" />
            <p className="card-text">
              {shoFullDiscription
                ? description
                : `${description.slice(0, 50)}...`}
            </p>
          </div>

          <div className="service-card-btn-container">
            <FaCircleArrowRight className="card-btn" />
          </div>
        </div>
      </li>
      {/* {openView && (
        <div className="popup-model-outer-container ">
          <div className="popup-model-contents ">
            <ViewServiceCard setOpenView={setOpenView}  service={service}/>
          </div>
        </div>
      )} */}
    </NavLink>
  );
};

export default ServiceCard;
