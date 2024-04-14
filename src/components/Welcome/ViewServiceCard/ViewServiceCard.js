import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import "./ViewServiceCard.css";
import { RatingStars } from "../../Utilities/Utilities";
const ViewServiceCard = () => {
  const history = useHistory();
  const { id ,desc_id} = useParams();

  const [viewServiceData, setViewServiceData] = useState([]);
  const getViewDetailsByServiceId = async () => {
    console.log("fetch service details by id", id);

    const URL = `http://localhost:4001/api/view-service-details/${id}`;

    try {
      const response = await fetch(URL);
      const jsonData = await response.json();
      console.log(jsonData, "salonn service data");
      if (jsonData.code === 200 && jsonData.status === true) {
        setViewServiceData(jsonData.data );
      }
    } catch (e) {}
  };

  useEffect(() => {
    getViewDetailsByServiceId();
  }, []);
  const backToSalonServicess = () => {
    console.log("back to salon servicess");
    history.replace("/#services");
  };

  const serviceCardActiveStyle={
    backgroundColor:'red'
  }
  
  return (
    <div className="view-service-card-container">
      <IoArrowBackCircle onClick={backToSalonServicess}  className="back-to-services" />

      {viewServiceData.map((item, index) => 
         <div className={`service-card-details ${desc_id == item.id ? "service-card-detailsActive":""}`} style={desc_id == item.id ?{ order: 0 }:{order: 1}} >
        
      
         
         <div className="image-container">
           <img src={item.image} alt={item.type} className="service-icon-img"/>
         </div>
         <div className="details-container">
           <h3 className="description-service-card-head">{item.type}</h3>
           <p className="description">{item.description}</p>
           <div className="additional-details">
            
             <p className="price description-service-card-head">Price: ${item.price}</p>
             

             <RatingStars rating={item.rating}/>
           </div>
         </div>
       </div>
      )}
    </div>
  );
};

export default ViewServiceCard;
