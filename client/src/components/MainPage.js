import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
import '../css/MainPage.css';

const MainPage = () => {
    return (
        <div className="container-fluid main-container">
            <Navbar />
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <div className="section-box">
                        <p className="label">STUDENT PAGE</p>
                        <img src="../../media/pexels-andrea-piacquadio-3768126.jpg" alt="Student Banner" className="img-fluid mini-banner" />
                        <Link to="/studentlogin" className="btn btn-primary custom-button">
                            Login
                        </Link>
                    </div>
                </div>

                <div className="col-md-4 col-sm-12">
                    <div className="section-box">
                        <p className="label">TEACHER PAGE</p>
                        <img src="../../media/pexels-christina-morillo-1181534.jpg" alt="Teacher Banner" className="img-fluid mini-banner" />
                        <Link to="/teacherlogin" className="btn btn-primary custom-button">
                            Login
                        </Link>
                    </div>
                </div>

                <div className="col-md-4 col-sm-12">
                    <div className="section-box">
                        <p className="label"> SCHOOL REGISTRATION</p>
                        <img src="../../media/pexels-pixabay-256467.jpg" alt="School Registration Banner" className="img-fluid mini-banner" />
                        <Link to="/schoolregistration" className="btn btn-primary custom-button">
                            Registration
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainPage;
