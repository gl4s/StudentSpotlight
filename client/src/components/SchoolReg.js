import React from 'react';
// import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
import '../css/SchoolReg.css';

const SchoolReg = () => {
    // const handleLogin = (e) => {
    //     e.preventDefault();
    // };

    return (
        <div className='container main-container'>
            <Navbar/>

            <Footer />
        </div>
    );
};

export default SchoolReg;