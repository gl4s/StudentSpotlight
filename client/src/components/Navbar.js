// Navbar.js
import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + '/media/logo.png'} alt="Logo" className="logo" />
        <div className="label-left">STUDENT SPOTLIGHT</div>
      </div>
      <div className="label-right">
        <div className="bold-label">Welcome!</div>
      </div>
    </nav>
  );
};

export default Navbar;
