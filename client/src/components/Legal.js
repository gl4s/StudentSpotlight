import React from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';

const Legal = () => {
    return (
        <div className='container main-container'>
            <Navbar />

            {/* Nem használt */}

            <Footer />
        </div>
    );
};

export default Legal;