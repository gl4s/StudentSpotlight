import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar.js';
import Footer from '../Footer.js';
import '../../css/Navbar.css';
import '../../css/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeacherProfile = () => {

    const navigate = useNavigate();

    const handleBack = () => {
       
        navigate('/teacher'); 
    };

    return (
        <div className='container main-container'>
            <Navbar />

           <div className='content-box'>
           <button className="btn btn-primary mr-2" onClick={handleBack}>
                            Back
                        </button>
           </div>

            <Footer />
        </div>
    );
};

export default TeacherProfile;