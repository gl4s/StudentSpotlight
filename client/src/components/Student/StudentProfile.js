import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import '../../css/Navbar.css';
import '../../css/Footer.css';

const StudentProfile = () => {

    const handleUpload = () => {
        
        console.log('Upload button clicked');
    };

    const navigate = useNavigate();

    const handleBack = () => {
       
        navigate('/student'); 
    };

    return (
        <div className='container main-container'>
            <Navbar />
            
                <div className='content-box'>
                <button className="btn btn-primary mr-2" onClick={handleBack}>
                            Back
                        </button>
                <div className='row'>
                <div className='col-md-6'>
                <p className='label'>Active Profile</p>
                <div className='section-box'>
                <p></p>
                
                
                
                </div>
                
                </div>
                
                <div className='col-md-6'>
                <p className='label'>Missing Classes</p>
                <div className='section-box'>
                <button className="btn btn-primary mr-2" onClick={handleUpload}>
                            Upload certification
                        </button>
                </div>
                
                </div>
                
                </div>
                
                </div>
            
            <Footer />
        </div>
    );
};

export default StudentProfile;