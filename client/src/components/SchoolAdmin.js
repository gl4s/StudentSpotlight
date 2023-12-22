import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import axios from 'axios';
import MainSchoolAdminComp from './MainSchoolAdminComp.js';

const SchoolAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsAuthenticated(false);
                    return;
                }

                const response = await axios.get('http://localhost:3001/api/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                console.error('Authentication failed:', error);
            }
        };

        verifyToken();
    }, []);

    if (!isAuthenticated) {
        navigate('/teacherlogin');
        return null; // or render a loading spinner or message
    }

    return (
        <div className='container main-container'>
            <Navbar />
            {isAuthenticated && <MainSchoolAdminComp />}
            <Footer />
        </div>
    );
};

export default SchoolAdmin;