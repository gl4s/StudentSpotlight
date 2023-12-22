import React from 'react';
// import { Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
// const authenticateToken = require('../../../routes/controllers/authMiddleware.js');

// Teacher.js
const Teacher = () => {
    return (
        <div className='container main-container'>
            <Navbar />
            {/* <Route path="/teacher" element={<Teacher />} canActivate={authenticateToken} /> */}
            <Footer />
        </div>
    );
};

export default Teacher;