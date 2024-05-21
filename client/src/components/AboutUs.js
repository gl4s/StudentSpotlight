import React from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
import '../css/AboutUs.css';

const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <div className='container-fluid main-container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='content-box text-center'>
                            <h2>About Us</h2>
                            <p>
                                We are a passionate team dedicated to providing schools possibly the best grading platform.
                            </p>

                            <p>Our goal is to Create a comprehensive grading platform that empowers teachers and school administrators to efficiently manage and track student grades in individual classes.</p>
                            <p>The website aims to provide a user-friendly interface for teachers to input grades, monitor student performance, and generate reports.</p>
                            <p>The system should enhance communication between teachers and students, allowing for timely feedback and performance analysis.</p>

                            <p>
                                Meet the team behind StudentSpotlight:
                            </p>
                            <ul className='list-unstyled'>
                                <li>Forrás Márk - Leader, BackEnd</li>
                                <li>Frech Szabolcs - Tester, FrontEnd</li>
                            </ul>

                            <img src={process.env.PUBLIC_URL + '/media/logo.png'} alt="Logo" className='img-responsive img' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
