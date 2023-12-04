import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
import '../css/StudentLogin.css';
import axios from 'axios';

const StudentLogin = () => {
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState('');
    // const [employeeId, setEmployeeId] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState(null);

    // const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of schools when the component mounts
        const fetchSchools = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/mainpage/schools');
                setSchools(response.data);
            } catch (error) {
                console.error('Error fetching schools', error);
            }
        };

        fetchSchools();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // try {
        //     // Make an HTTP request to log in the teacher
        //     const response = await axios.post('http://localhost:3001/api/auth/login', {
        //         username: selectedSchool + '_' + employeeId, // Assuming you concatenate school name and employee ID
        //         password,
        //     });

        //     // Handle successful login
        //     console.log('Teacher login successful!', response.data);

        //     // Use an alert box to display a message
        //     window.alert('Login successful!');

        //     // Redirect to the SchoolAdmin subpage
        //     navigate('/schooladmin');
        // } catch (error) {
        //     // Handle login error
        //     console.error('Teacher login failed!', error.response?.data);
        //     setError(error.response?.data?.message || 'Login failed');
        // }
    };

    return (
        <div className='container main-container'>
            <Navbar />
            <div className="login-box">
                <div className='login-header'>
                    <Link to="/" className="back-button">&#9664; Back</Link>
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
                                <option key={school.SchoolID} value={school.SchoolIdentifier}>
                                    {school.SchoolName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="extra">Student ID</label>
                        <input id="studentid" type="text" placeholder="Student ID" required />
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

export default StudentLogin;
