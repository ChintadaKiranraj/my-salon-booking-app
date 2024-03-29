import React, { useEffect } from "react";

import { useState } from "react";
import ServiceCard from "./ServiceCard";

// import BookingFormTwo from "../Appointment/appointment.js";
import Footer from "./Footer.js";
// import ShopRegistrationForm from "../ShopRegistrationForm/shopregistrationform.js";
import RegistrationForm from "../UserManagment/UserRegistrationForm/UserRegistrationForm.js";
// import IndividualIntervals from "./PhotoCarousel.js";
// import { Link } from "@mui/material";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min.js";

export const BarberLogoTitle = () => {
  return (
    <div className="barber-salon-logo">
      <h1>Barber</h1>
      <span className="logo-sub-title">Hair Salon</span>
    </div>
  );
};
const Welcome = () => {
  const [servicessList, setServicessList] = useState([]);

  useEffect(() => {
    const fetchServicessList = async () => {
      const response = await fetch(
        "http://localhost:4001/api/get-salon-servicess"
      );
      const servicessListFromServer = await response.json();
      setServicessList(servicessListFromServer.data);
    };
    fetchServicessList();
  }, []);
  return (
    <>
      <div className="main-header">
        <div className="">{<BarberLogoTitle />}</div>

        <ul className="navbar-list">
          <li>
            <a href="#home">Home</a>
          </li>

          <li >
            <a href="#services" className="navbar-link">
              Services
            </a>
          </li>

          <li>
            <a href="#pricing" className="navbar-link">
              Pricing
            </a>
          </li>

          <li>
            <a href="#gallery" className="navbar-link">
              Gallery
            </a>
          </li>
          <li>
            <a href="#registration" className="navbar-link" data-nav-link>
              Sign Up Now
            </a>
          </li>

          <li>
            <a href="#contact" className="navbar-link" data-nav-link>
              Contact
            </a>
          </li>
        </ul>

        <a href="#registration" className="register-now">
          <span>Register Now</span>

          <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
        </a>
        <NavLink to="login" className="register-now">
          <span>Login</span>
        </NavLink>
      </div>
      
      <section className="home-section-bgimg" id="home">
        <div className="section-home-container">
          <h1 className="baraber-title-head">Barbers & Hair Cutting</h1>

          <p className="quotation">
            Elevate your style with our expert barbers, where every haircut is a
            masterpiece. Step into a realm of precision and creativity, tailored
            to enhance your unique personality.
          </p>

          <a href="#" className="explore-services">
            <span className="span">Explore Our Services</span>

            <ion-icon nameName="arrow-forward" aria-hidden="true"></ion-icon>
          </a>
        </div>
      </section>

      <section className="service-section" id="services">
        <div className="service-section-container">
          <h2 className="service-headder">Service We Provide</h2>
          <p className="service-section-text">
            Elevate your style with our expert barbers, where every haircut is a
            masterpiece. Step into a realm of precision and creativity, tailored
            to enhance your unique personality.
          </p>
          <ul className="service-cards-list-container">
            {servicessList.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </ul>
        </div>
      </section>

      {/* <section class="section appoin" id="appointment" aria-label="appointment">
        <div class="appointment-container">
          <div class="appoin-card">
            <div class="appointment-card-content">
              <div className="appointment-headding-content">
                <h2 class="appointment-head">Make Appointment</h2>

                <p className="appointment-content">
                  Thank you for choosing our barber shop. We look forward to
                  providing you with a great grooming experience!
                </p>
              </div>

              <BookingFormTwo />
            </div>
          </div>
        </div>
      </section> */}
      <section id="registration">
        <RegistrationForm />
      </section>

      <section id="contact">
        <Footer />
      </section>
    </>
  );
};
export default Welcome;
