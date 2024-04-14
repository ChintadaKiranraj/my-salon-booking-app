import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import {RatingStars} from "../Utilities/Utilities.js"

import {
  PricingCard,
  PricingMainContainer,
  ServiceName,StarIcon
} from "../../StyledComponents.js";

const Pricing = () => {
  const servicImgStyle = {
    width: 50,
    height: 50,
    textAlign: "center",
 
  };
 
  const priceRatingContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
  };

  const [servicePriceDetails, setServicePriceDetails] = useState([]);
  const fetchAllLocation = async () => {
    try {
      const response = await fetch("http://localhost:4001/api/servie-details");
      const serviceDetails = await response.json();
      setServicePriceDetails(serviceDetails.data);
      console.log(serviceDetails.data);
    } catch (e) {
      console.log("service details");
    }
  };
  useEffect(() => {
    fetchAllLocation();
  }, []);

 
  
  

  const ServiceCard = (props) => {
    const { service } = props;
    return (
      <NavLink to={`service-description/${service.service_id}/${service.id}`}>
        <PricingCard>
          <ServiceName>{service.type}</ServiceName>

          <img src={service.image} alt={service.type} style={servicImgStyle} />
          <div style={priceRatingContainer}>
            <ServiceName>${service.price}</ServiceName>
            <RatingStars rating={service.rating}/>
          </div>
        </PricingCard>
      </NavLink>
    );
  };

  return (
    <PricingMainContainer>
    
      {servicePriceDetails.map((service) => (
        <ServiceCard service={service} key={service.id} />
      ))}
    </PricingMainContainer>
  );
};

export default Pricing;
