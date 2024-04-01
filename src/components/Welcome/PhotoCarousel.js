import Carousel from "react-bootstrap/Carousel";
import React, { useEffect, useState } from "react";
import "./Welcome.css";




import hairColor from "../../assets/images/cut3.jpg";

import hairCut from "../../assets/images/cut4.avif";
import mackup from "../../assets/images/s1.jpg";


const PhotoCarousel = () => {
 

  const images = [hairColor, hairCut,mackup];

  return (
    <div className="carousel-container">
      <Carousel>
        {images.map((imageUrl, index) => (
          <Carousel.Item key={index} interval={2000}>
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="courasulImgStyle"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default PhotoCarousel;

