import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/TeacherLogin.css'
import '../css/Navbar.css';
import '../css/Footer.css';
import axios from 'axios';

const TeacherLogin = () => {
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/school/schools', { withCredentials: false });
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
            const username = `${selectedSchool}-${employeeId}`;


            const response = await axios.post(
                'http://localhost:3001/api/auth/login',
                {
                    username,
                    password,
                },
            );


            const userType = response.data.userType;
            const token = response.data.token;
            // const schoolName = response.data.schoolName;

            localStorage.setItem('token', token);

            window.alert('Login successful!');

            if (userType === 'teacher') {
                navigate('/teacher');
            } else if (userType === 'schooladmin') {
                // Redirect to the school admin page with the schoolId
                navigate(`/schooladmin`);
            } else if (userType === 'systemadmin') {
                navigate('/systemadmin');
            }
        } catch (error) {
            // Handle login error
            console.error('Login failed!', error.response?.data);
            setError(error.response?.data?.message || 'Login failed');
        }
    };




    return (
        <div className='container-fluid main-container'>
            <Navbar />
            <div className="login-box">
                <div className='login-header'>
                    <Link to="/" className="btn btn-secondary back-button">Back</Link>
                    <h2 className="login-label">Teacher Login</h2>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                    
                    <div className="mb-3">
                        <label htmlFor="school" className="form-label">School</label>
                        <select
                            id="school"
                            className="form-select"
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
                    <div className="mb-3">
                        <label htmlFor="employeeId" className="form-label">Employee ID</label>
                        <input
                            id="employeeId"
                            type="text"
                            className="form-control"
                            placeholder="Employee ID"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className='btn btn-primary custom-button' type="submit">Login</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default TeacherLogin;

