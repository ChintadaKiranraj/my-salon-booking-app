import Carousel from "react-bootstrap/Carousel";
import React, { useEffect, useState } from "react";
import "./Welcome.css";


import image1 from "../../assets/images/beautyImages.jpg";

import image2 from "../../assets/images/eight.jpg";

import image3 from "../../assets/images/ten.jpg";
import image4 from "../../assets/images/cut3.jpg";

import image5 from "../../assets/images/cut4.avif";

const PhotoCarousel = () => {
  //     const [imagePaths, setImagePaths] = useState([]);
  //     useEffect(() => {
  //         const importImages = async () => {
  //           const context = require.context("../../assets/images/");
  //           const paths = context.keys().map(context);
  //           setImagePaths(paths);
  //         };
  //         importImages();
  // },[])

  const images = [image1, image2, , image3, image4, image5];

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
/* <Carousel className="carousel">
{imagePaths.map((image, index) => (
  <Carousel.Item key={index} interval={1000}>
    <img src={image.default} alt={`Image ${index + 1}`} />
  </Carousel.Item>
))}
</Carousel> */
