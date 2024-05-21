import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== passwordAgain) {
            setError("Passwords don't match");
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

            window.alert('Registration successful! \nYou will be redirected to the Mainpage after closing this window.');

            // Redirect to the main page
            navigate('/');
        } catch (error) {
            // Handle registration error (show an error message, log, etc.)
            console.error('School registration failed!', error.response.data);
            setError(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className='container-fluid main-container'>
            <Navbar />
            <div className="registration-box">
                <div className='registration-header'>
                    <Link to="/" className="back-button btn btn-secondary">Back</Link>
                    <h2 className="registration-label">School Registration</h2>
                </div>
                <form className="registration-form" onSubmit={handleRegistration}>

                    <div className="input-group">
                        <label htmlFor="schoolName">School Name</label>
                        <input
                            id="schoolName"
                            type="text"
                            placeholder="School Name"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="SchoolIdentifier">School Identifier (OM)</label>
                        <input
                            id="schoolIdentifier"
                            type="text"
                            placeholder="School Identifier"
                            value={schoolIdentifier}
                            onChange={(e) => setSchoolIdentifier(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="Address">School Address</label>
                        <input
                            id="address"
                            type="text"
                            placeholder="School Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group-row">
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="passwordagain">Password Again</label>
                            <input
                                id="passwordagain"
                                type="password"
                                placeholder="Password Again"
                                value={passwordAgain}
                                onChange={(e) => setPasswordAgain(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <button className='custom-button' type="submit">Register</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SchoolReg;
