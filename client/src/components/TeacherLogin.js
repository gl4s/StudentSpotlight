import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';

const TeacherLogin = () => {
    const handleLogin = (e) => {
        e.preventDefault();
    };
    return (
        <div className='container main-container'>
            <Navbar />
            <div className="login-box">
                <div className='login-header'>
                    <Link to="/" className="back-button">&#9664; Back</Link>
                    <h2 className="login-label">Teacher Login</h2>
                </div>
                <form className="login-form" onSubmit={handleLogin}>

                    <div className="input-group">
                        <label htmlFor="school">School</label>
                        <select id="school" required>
                            <option value="">Select...</option>
                            <option value="school1">School 1</option>
                            <option value="school2">School 2</option>
                            <option value="school3">School 3</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="extra">Employee ID</label>
                        <input id="studentid" type="text" placeholder="Employee ID" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Password" required />
                    </div>

                    <button className='custom-button' type="submit">Login</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default TeacherLogin;