import React, { useState } from 'react';
// import './CarList.css'; // Import your CSS file

const CarList = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    setScrollPosition(scrollPosition - 220); // Adjust this value based on the car card width and margin
  };

  const scrollRight = () => {
    setScrollPosition(scrollPosition + 220); // Adjust this value based on the car card width and margin
  };

  return (
    <div className="carousel-container">
      <button className="arrow left" onClick={scrollLeft}>&lt;</button>
      <div className="car-list" style={{ transform: `translateX(${scrollPosition}px)` }}>
        {/* Your list of cars goes here */}
        <div className="car">Car hhhhhhhhhhhhhhhhhhh1</div>
        <div className="car">Car 2</div>
        <div className="car">Car 3</div>
        {/* Add more cars as needed */}
      </div>
      <button className="arrow right" onClick={scrollRight}>&gt;</button>
    </div>
  );
};

export default CarList;
