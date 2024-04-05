import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/SubjectAssignment.css';

const SubjectAssignmentComp = () => {
    const [tableData, setTableData] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    // eslint-disable-next-line
    const [userId, setuserId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeToken(token);
            fetchTableData();
            fetchSubjects();
            fetchTeachers(decodedToken.userId); // Pass the schoolID to the fetchTeachers function
        }
    }, []);
        

    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
    };

    const fetchSubjects = () => {
        axios.get('http://localhost:3001/api/subjects/all')
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    };

    const fetchTableData = () => {
        axios.get('http://localhost:3001/api/subjectassignment/all')
            .then(response => {
                setTableData(response.data);
            })
            .catch(error => {
                console.error('Error fetching table data:', error);
            });
    };

    const fetchTeachers = async (schoolId) => {
        try {
            const token = localStorage.getItem('token');
            const decodedToken = decodeToken(token);
            console.log("Before the get API call:", decodedToken.userId);
    
            const response = await axios.get(`http://localhost:3001/api/subjectassignment/teachers`, {
                params: {
                    userId: decodedToken.userId, // Pass the userId parameter
                    schoolId: schoolId, // Pass the schoolId parameter
                },
            });
    
    
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };
    
    
    
    


    const handleDelete = (assignmentId) => {
        const userConfirmation = window.confirm('Are you sure you want to delete this subject assignment?');
        if (userConfirmation) {
            axios.delete(`http://localhost:3001/api/subjectassignment/delete/${assignmentId}`)
                .then(response => {
                    console.log(`Deleted row with ID: ${assignmentId}`);
                    fetchTableData();
                })
                .catch(error => {
                    console.error('Error deleting row:', error);
                });
        }

    };

    const handleAssign = () => {
        if (selectedSubject && selectedTeacher) {
            axios.post('http://localhost:3001/api/subjectassignment/assign', {
                subject: selectedSubject,
                teacher: selectedTeacher
            })
                .then(response => {
                    console.log(`Assigned ${selectedSubject} to ${selectedTeacher}`);
                    fetchTableData();
                    setSelectedSubject('');
                    setSelectedTeacher('');
                })
                .catch(error => {
                    console.error('Error assigning subject:', error);
                });
        } else {
            console.error('Please select both subject and teacher');
        }
    };

    return (
        <div className='box'>
            <div className="header">
                <Link to="/schooladmin" className="back-button">
                    Back
                </Link>
                <h2 className="title">Assign Subjects to Teachers</h2>
            </div>
            <div className="custom-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Teacher</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.CourseName}</td>
                                <td>{row.Teacher}</td>
                                <td>
                                    <button className="delete-button" onClick={() => handleDelete(row.AssignmentID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="custom-dropdowns">
                <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                    <option value="">Select a Subject</option>
                    {subjects.map((subject, index) => (
                        <option key={index} value={subject.CourseID}>{subject.CourseName}</option>
                    ))}
                </select>

                <select value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                    <option value="">Select a Teacher</option>
                    {teachers.map((teacher, index) => (
                        <option key={index} value={teacher.UserID}>{`${teacher.FirstName} ${teacher.LastName}`}</option>
                    ))}
                </select>

                <button className='assign-button' onClick={handleAssign}>Assign Subject to the Selected Teacher</button>
            </div>
        </div>
    );
};

export default SubjectAssignmentComp;
