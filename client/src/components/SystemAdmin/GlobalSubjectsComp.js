import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../css/GlobalSubjects.css';

const GlobalSubjectsComp = () => {
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = () => {
        axios.get('http://localhost:3001/api/subjects/all')
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    };

    const handleDelete = (courseId) => {
        axios.delete(`http://localhost:3001/api/subjects/delete/${courseId}`)
            .then(response => {
                fetchSubjects();
            })
            .catch(error => {
                console.error('Error deleting subject:', error);
            });
    };

    const handleSubmit = () => {
        axios.post('http://localhost:3001/api/subjects/add', { courseName: newSubject })
            .then(response => {
                fetchSubjects();
                setNewSubject('');
            })
            .catch(error => {
                console.error('Error adding subject:', error);
            });
    };

    const handleChange = (event) => {
        setNewSubject(event.target.value);
    };

    return (
        <div className='subjects-box'>
            <div className="header">
                <Link to="/systemadmin" className="back-button">
                    Back
                </Link>
                <h2 className="title">Global Subjects</h2>
            </div>
            <div className="custom-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(subject => (
                            <tr key={subject.CourseID}>
                                <td>{subject.CourseID}</td>
                                <td>{subject.CourseName}</td>
                                <td>
                                    <button className="delete-button" onClick={() => handleDelete(subject.CourseID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="custom-add-subject">
                <input
                    type="text"
                    value={newSubject}
                    onChange={handleChange}
                    placeholder="Enter subject name"
                />
                <button onClick={handleSubmit}>Add Subject</button>
            </div>
        </div>
    );
};

export default GlobalSubjectsComp;
