import React from "react";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <div className="social-media-logos">
        <FaFacebookSquare className="social-icon" />
        <FiTwitter className="social-icon" />
        <FaInstagram className="social-icon" />
        <FaLinkedin className="social-icon" />
      </div>

      <div className="footer-container">
    
      <div>
        <span className="copyright-text">
          © 2024 Copyright:
          <a href="https://baraber.com/" className="text-white">
            baraber.com
          </a>
        </span>
      </div>
    </div>
    
    </div>
  );
};

export default Footer;
