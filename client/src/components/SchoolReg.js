import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
import '../css/SchoolReg.css';
import axios from 'axios';

const SchoolReg = () => {
    const [schoolName, setSchoolName] = useState(''); // eslint-disable-next-line no-unused-vars
    const [schoolIdentifier, setSchoolIdentifier] = useState(''); // eslint-disable-next-line no-unused-vars
    const [address, setAddress] = useState(''); // eslint-disable-next-line no-unused-vars
    const [password, setPassword] = useState(''); // eslint-disable-next-line no-unused-vars
    const [passwordAgain, setPasswordAgain] = useState(''); // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null);

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== passwordAgain) {
            // Handle password mismatch
            return;
        }

        try {
            // Make an HTTP request to register the school
            const response = await axios.post('http://localhost:3001/api/auth/school/register', {
                schoolName,
                schoolIdentifier,
                address,
                password,
            });

            // Handle successful registration (you can redirect or show a success message)
            console.log('School registration successful!', response.data);

            // For example, you can redirect to another page
            // You may need to import useHistory from 'react-router-dom'
            // const history = useHistory();
            // history.push('/success-page');
        } catch (error) {
            // Handle registration error (show an error message, log, etc.)
            console.error('School registration failed!', error.response.data);
            setError(error.response?.data?.message || "Registration failed");
        }
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
                    {error && <p className="error-message">{error}</p>}
                    <button className='custom-button' type="submit">Register</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SchoolReg;
