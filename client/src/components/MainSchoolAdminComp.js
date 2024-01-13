import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import '../css/SchoolAdminComp.css';

const MainSchoolAdminComp = () => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [schoolName, setSchoolName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
            const currentTime = Date.now();
            const timeDifference = expirationTime - currentTime;

            setRemainingTime(Math.floor(timeDifference / 1000)); // Convert milliseconds to seconds
            setSchoolName(decodedToken.schoolName);

            // Update the remaining time every second
            const intervalId = setInterval(() => {
                setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);

            // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, []);

    // Function to parse JWT (extracted from the token)
    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/teacherlogin');
    };

    return (
        <div className="content-box">
            <div className="header">
                <h2 className="title">{schoolName}</h2>
                <div className="logout-section">
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                    <p className="counter">Remaining Time: {formatTime(remainingTime)}</p>
                </div>
            </div>
            <div className="buttons">
                <button onClick={() => navigate('/schoolschedule')}>School Schedule</button>
                <button onClick={() => navigate('/schoolmeta')}>School Meta</button>
                <button onClick={() => navigate('/subjectassignment')}>Subject Teacher</button>
                <button onClick={() => navigate('/newuser')}>New Student or Teacher</button>
                <button onClick={() => navigate('/members')}>Member List</button>
                <button onClick={() => navigate('/statistics')}>Statistics</button>
            </div>
        </div>
    );
};


const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};


export default MainSchoolAdminComp;
