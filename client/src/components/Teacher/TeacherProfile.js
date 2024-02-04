import React from 'react';
import Navbar from '../Navbar.js';
import Footer from '../Footer.js';
import '../../css/Navbar.css';
import '../../css/Footer.css';

const TeacherProfile = () => {
    return (
        <div className='container main-container'>
            <Navbar />

           <div className='content-box'></div>

            <Footer />
        </div>
    );
};

export default TeacherProfile;