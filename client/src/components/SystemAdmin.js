import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import axios from 'axios';
import SystemAdminComp from './SystemAdminComp.js';

// SystemAdmin.js
const SystemAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [verificationAttempted, setVerificationAttempted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    setIsAuthenticated(false);
                    navigate('/teacherlogin');
                    return;
                }
        
                const response = await axios.get('http://localhost:3001/api/auth/verify', {
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
            <SystemAdminComp/>
            <Footer />
        </div>
    );
};

export default SystemAdmin;