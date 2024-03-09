import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css";
const WelcomePage = () => {
  return (
    <div className="homepage-container">
      <div className="home-head">
        <h1>Welcome to Our Salon Booking Platform!</h1>
        
        <div className="registration-options">
          <Link to="/RegistrationForm" className="registration-button">
            Register as new user
          </Link>
         
          <Link to="/login" className="registration-button">
            Sign In
          </Link>
        </div>
      </div>

      <div className="registration-options-description">
        <h1> Service Description:</h1>

        <p>
          Welcome to our Barber Services platform! We offer a streamlined
          solution for both salon/barbershop owners and customers seeking
          top-notch grooming services.
        </p>

        <h1>For Salon/Barbershop Owners:</h1>

        <p>
          As a salon/barbershop owner, you can register with us to manage your
          establishment efficiently. Upon registration, you'll gain access to a
          comprehensive dashboard where you can:
        </p>
        <ul>
          <li>
            Add and manage details about your salon/barbershop, including its
            name, location, and contact information.
          </li>
          <li>
            Specify the number of barbers working at your establishment and
            manage their schedules and availability.
          </li>
          <li>
            Customize the list of services offered, including haircut styles,
            beard trims, grooming packages, and more.
          </li>
          <li>
            Track appointments booked by customers and manage them effortlessly
            through our intuitive interface.
          </li>
          <li>
            Receive notifications and reminders for upcoming appointments to
            ensure smooth operations.
          </li>
        </ul>
        <h1>For Customers:</h1>
        <p>
          If you're looking for quality grooming services, our platform makes it
          easy for you to book appointments with your preferred
          salon/barbershop. Here's what you can expect:
        </p>
        <ul>
          <li>
            Register as a user on our platform to access a range of grooming
            services conveniently.
          </li>
          <li>
            Browse through a curated list of salon/barbershop options based on
            your location and preferences.
          </li>
          <li>
            Choose your preferred barber and select from a variety of services
            offered, including haircuts, shaves, beard trims, and more.
          </li>
          <li>
            Schedule appointments at your convenience, selecting the date and
            time that works best for you.
          </li>
          <li>
            Receive confirmation and reminders for your appointments, ensuring
            that you never miss a grooming session
          </li>
        </ul>
        <h1>User Experience</h1>
        <p>
          When you visit our website, you'll be greeted with a user-friendly
          interface that guides you through the registration process based on
          your role:
        </p>
        <ul>
          <li>
            Shop Owner Registration: If you're a salon/barbershop owner, simply
            select the "Register as Shop Owner" option to begin managing your
            establishment efficiently.
          </li>
          <li>
            Customer Registration: If you're a customer seeking grooming
            services, choose the "Register as User" option to access a wide
            range of salon/barbershop options and book appointments seamlessly.
          </li>
          <li>
            Our platform is designed to provide a seamless experience for both
            salon/barbershop owners and customers, ensuring that you can easily
            access the services you need with just a few clicks. Whether you're
            looking to manage your establishment or book grooming services,
            we've got you covered!
          </li>
        </ul>
      </div>
      <footer>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/your_instagram_handle"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            href="https://twitter.com/your_twitter_handle"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          {/* Add more social media icons here */}
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
