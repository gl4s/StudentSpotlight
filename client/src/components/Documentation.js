import React from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';

const Documentation = () => {
    return (
        <div className='container main-container'>
            <Navbar />

            {/* Nem használt, a letöltés enélkül is megtörténik */}

            <Footer />
        </div>
    );
};

export default Documentation;