import React from 'react';
// import { Route } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
// const authenticateToken = require('../../../routes/controllers/authMiddleware.js');

// SystemAdmin.js
const SystemAdmin = () => {
    return (
        <div className='container main-container'>
            <Navbar />
            {/* <Route path="/systemadmin" element={<SystemAdmin />} canActivate={authenticateToken} /> */}
            <Footer />
        </div>
    );
};

export default SystemAdmin;