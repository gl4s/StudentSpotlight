// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-labels">
        <Link to="/aboutus" className="footer-label">
            ABOUT US
        </Link>
        <Link to="/documentation" className="footer-label">
          DOCUMENTATION
        </Link>
        <Link to="/contact" className="footer-label">
          CONTACT
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
