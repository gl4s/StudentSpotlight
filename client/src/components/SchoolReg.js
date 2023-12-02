import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
import '../css/SchoolReg.css';

const SchoolReg = () => {
    const handleRegistration = (e) => {
        e.preventDefault();
    };

    return (
        <div className='container main-container'>
            <Navbar />
            <div className="registration-box">
                <div className='registration-header'>
                    <Link to="/" className="back-button">◀ Back</Link>
                    <h2 className="registration-label">School Registration</h2>
                </div>
                <form className="registration-form" onSubmit={handleRegistration}>

                    <div className="input-group">
                        <label htmlFor="schoolName">School Name</label>
                        <input id="schoolName" type="text" placeholder="School Name" required />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="schoolIdentifier">School Identifier (OM)</label>
                        <input id="schoolIdentifier" type="text" placeholder="School Identifier" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="schoolAddress">School Address</label>
                        <input id="schoolAddress" type="text" placeholder="School Address" required />
                    </div>
                    <div className="input-group-row">
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="Password" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="passwordagain">Password Again</label>
                            <input id="passwordagain" type="password" placeholder="Password Again" required />
                        </div>
                    </div>

                    <button className='custom-button' type="submit">Register</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SchoolReg;
