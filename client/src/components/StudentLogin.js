import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
import '../css/StudentLogin.css';
import axios from 'axios';

const StudentLogin = () => {
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState('');
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/school/schools', {withCredentials: false});
                setSchools(response.data);
            } catch (error) {
                console.error('Error fetching schools', error);
            }
        };

        fetchSchools();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const username = `${selectedSchool}-${studentId}`;

            // Debug log
            console.log('Username:', username);

            const response = await axios.post(
                'http://localhost:3001/api/auth/login',
                {
                    username,
                    password,
                },
            );

            // Handle successful login
            console.log('Student login successful!', response.data);

            window.alert('Login successful!');

            const userType = response.data.userType;
            const token = response.data.token;

            console.log('User Type:', userType);
            localStorage.setItem('token', token);

            if (userType === 'student') {
                navigate('/student');
            } else {
                window.alert('Error, try again later')
            }


        } catch (error) {
            // Handle login error
            console.error('Student login failed!', error.response?.data);
            setError(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className='container main-container'>
            <Navbar />
            <div className="login-box">
                <div className='login-header'>
                    <Link to="/" className="back-button"> Back</Link>
                    <h2 className="login-label">Student Login</h2>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="school">School</label>
                        <select
                            id="school"
                            value={selectedSchool}
                            onChange={(e) => setSelectedSchool(e.target.value)}
                            required
                        >
                            <option value="">Select...</option>
                            {schools.map((school) => (
                                <option key={school.SchoolID} value={school.SchoolName}>
                                    {school.SchoolName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="studentid">Student ID</label>
                        <input
                            id="studentid"
                            type="text"
                            placeholder="Student ID"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                        />
                    </div>
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

                    <button className='custom-button' type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
            <Footer />
        </div>
    );
};

export default StudentLogin;
