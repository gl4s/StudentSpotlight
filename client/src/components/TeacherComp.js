import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/TeacherComp.css';


const TeacherComp = () => {
    const [remainingTime, setRemainingTime] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
            const currentTime = Date.now();
            const timeDifference = expirationTime - currentTime;

            setRemainingTime(Math.floor(timeDifference / 1000)); // Convert milliseconds to seconds

            // Update the remaining time every second
            const intervalId = setInterval(() => {
                setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);

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
        <>
           
            <div className="content-box" style={{marginTop:'600px'}}>
           
                <div className="header">
               
                    <p className='title'>
                        Manage your classes, assignments, and grades efficiently.
                    </p>
                    
                    <div className="logout-section">
                        <button className="btn btn-danger logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                        <p className="counter">Remaining Time: {formatTime(remainingTime)}</p>
                    </div>
                </div>
                
                <div className="buttons">
               
                    <button onClick={() => navigate('/TeacherClasses')}>Classes</button>
                    <button onClick={() => navigate('/TeacherAssignments')}>Assignments</button>
                    <button onClick={() => navigate('/TeacherGrades')}>Grades</button>
                    <button onClick={() => navigate('/TeacherProfile')}>Profile</button>
                </div>
            </div>
            
            

           
            <div className="container">
                <div className="content-box mt-4">
                    <div className='row'>
                        <div className="col-md-6">
                            <p className='label'>Today's Classes</p>
                            <div className="section-box">
                                <p></p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <p className='label'>Notifications</p>
                            <div className="section-box">
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    );
};

const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default TeacherComp;
