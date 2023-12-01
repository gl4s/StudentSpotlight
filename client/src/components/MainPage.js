import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
import '../css/MainPage.css';

const MainPage = () => {
    return (

      <div className="container main-container">
        <Navbar />
        <div className="content-box">
          <div className="row">
            <div className="col-md-4">
              <div className="section-box">
              <p className="label">STUDENT PAGE</p>
                <div className="mini-banner">Banner 1</div>
                <Link to="/studentlogin" className="btn btn-primary custom-button">
                  Login
                </Link>
              </div>
            </div>
  
            <div className="col-md-4">
              <div className="section-box">
              <p className="label">TEACHER PAGE</p>
                <div className="mini-banner">Banner 2</div>                
                <Link to="/teacherlogin" className="btn btn-primary custom-button">
                  Login
                </Link>
              </div>
            </div>
  
            <div className="col-md-4">
              <div className="section-box">
              <p className="label">REGISTRATION</p>
                <div className="mini-banner">Banner 3</div>                
                <Link to="/registration" className="btn btn-primary custom-button">
                  Registration
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

export default MainPage;
