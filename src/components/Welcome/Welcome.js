import React, { useEffect } from "react";
// import "./welcome.css";
import "./index.css";
import { useState } from "react";
import GalleryImg from "../../assets/images/gallery-1.jpg";
import ServiceCard from "./ServiceCard";
import Pricing from "./Pricing";
import CarList from "./carlist.js";

import BookingFormTwo from "../BookingFormTwo/bookingformTwo.js";
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
      <header className="header">
        <div class="header-bottom" data-header>
          <div class="container">
            <a href="#" class="logo">
              Barber
              <span class="span">Hair Salon</span>
            </a>

            <nav class="navbar container" data-navbar>
              <ul className="navbar-list">
                <li className="navbar-item">
                  <a href="#home" className="navbar-link">
                    Home
                  </a>
                </li>

                <li className="navbar-item">
                  <a href="#services" className="navbar-link">
                    Services
                  </a>
                </li>

                <li className="navbar-item">
                  <a href="#pricing" className="navbar-link">
                    Pricing
                  </a>
                </li>

                <li className="navbar-item">
                  <a href="#gallery" className="navbar-link">
                    Gallery
                  </a>
                </li>

                <li className="navbar-item">
                  <a href="#appointment" className="navbar-link" data-nav-link>
                    Appointment
                  </a>
                </li>

                <li className="navbar-item">
                  <a href="#" className="navbar-link" data-nav-link>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            <button
              className="nav-toggle-btn"
              aria-label="toggle menu"
              data-nav-toggler
            >
              <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
            </button>

            <a href="#appointment" className="btn has-before">
              <span className="span">Appointment</span>

              <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
            </a>
          </div>
        </div>
      </header>

      {/* home section */}
      <section className="home-section-bgimg" id="home">
        <div className="home-container">
          <h1 className="baraber-title-head">Barbers & Hair Cutting</h1>

          <p className="hero-text">
            Elevate your style with our expert barbers, where every haircut is a
            masterpiece. Step into a realm of precision and creativity, tailored
            to enhance your unique personality.
          </p>

          <a href="#" class="btn has-before">
            <span class="span">Explore Our Services</span>

            <ion-icon name="arrow-forward" aria-hidden="true"></ion-icon>
          </a>
        </div>
      </section>

      {/* service section */}

      <section className="service-section" id="services">
        <div className="service-container">
          <h2 className="service-headder">Service We Provide</h2>
          <p className="service-section-text">
            Elevate your style with our expert barbers, where every haircut is a
            masterpiece. Step into a realm of precision and creativity, tailored
            to enhance your unique personality.
          </p>
          <ul className="grid-list">
            {servicessList.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </ul>
        </div>
      </section>

      <section class="section appoin" id="appointment" aria-label="appointment">
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
      </section>

      <footer class="site-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-logo">
              <img src="logo.png" alt="Logo" />
            </div>

            <div class="footer-social">
              <ul>
                <ul class="footer-list">
                  <li>
                    <p class="footer-list-title">Contact Us</p>
                  </li>

                  <li class="footer-list-item">
                    <ion-icon
                      name="location-outline"
                      aria-hidden="true"
                    ></ion-icon>

                    <address class="contact-link">
                      7528 XXXXX Ave. Palm Bay, FL xxxxxx
                    </address>
                  </li>

                  <li class="footer-list-item">
                    <ion-icon name="call-outline" aria-hidden="true"></ion-icon>

                    <a href="tel:7893558435" class="contact-link">
                      7893558435
                    </a>
                  </li>

                  <li class="footer-list-item">
                    <ion-icon name="time-outline" ></ion-icon>

                    <span class="contact-link">
                      Sun - Friday, 08 am - 09 pm
                    </span>
                  </li>

                  <li class="footer-list-item">
                    <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>

                    <a href="mailto:support@gmail.com" class="contact-link">
                      support@gmail.com
                    </a>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2024 Your Salon Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Welcome;
