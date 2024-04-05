import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import '../css/Navbar.css';
import '../css/Footer.css';
import TeacherComp from './TeacherComp.js'

// Teacher.js
const Teacher = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [verificationAttempted, setVerificationAttempted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token);
                
                if (!token) {
                    setIsAuthenticated(false);
                    navigate('/teacherlogin');
                    return;
                }
        
                await axios.get('http://localhost:3001/api/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Authentication failed:', error);
                navigate('/teacherlogin');
            } finally {
                setVerificationAttempted(true);
            }
        };

        if (!verificationAttempted) {
            verifyToken();
        }
    }, [navigate, verificationAttempted]);

    if (!verificationAttempted) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <div>
                <p>Authentication failed. Please log in again.</p>
            </div>
        );
    }
    return (
        <div className='container main-container'>
            <Navbar />
            <TeacherComp />
            <Footer />
        </div>
    );
};

export default Teacher;