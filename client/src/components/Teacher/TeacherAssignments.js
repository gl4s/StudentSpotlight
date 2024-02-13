import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar.js';
import Footer from '../Footer.js';
import '../../css/Navbar.css';
import '../../css/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TeacherAssignments = () => {
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const handleAssignmentCreation = () => {
        // Check if all required fields are filled out before creating the assignment
        if (!assignmentTitle || !assignmentDescription || !dueDate || !selectedClass) {
            alert('Please fill out all required fields.');
            return;
        }

       
        console.log('Assignment created:', {
            title: assignmentTitle,
            description: assignmentDescription,
            dueDate: dueDate,
            selectedClass: selectedClass,
        });

        
        
    };

    const navigate = useNavigate();
    const handleBack = () => {
       
        navigate('/teacher'); 
    };

    return (
        <div className='container main-container'>
            <Navbar />

            <div className='content-box'>
            <button className="btn btn-primary mb-3" onClick={handleBack}>
                    Back
                </button>
                <h2>Create Assignment</h2>
                <form>
                    <div className='mb-3'>
                        <label htmlFor='assignmentTitle' className='form-label'>
                            Assignment Title
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            id='assignmentTitle'
                            value={assignmentTitle}
                            onChange={(e) => setAssignmentTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='assignmentDescription' className='form-label'>
                            Assignment Description
                        </label>
                        <textarea
                            className='form-control'
                            id='assignmentDescription'
                            rows='4'
                            value={assignmentDescription}
                            onChange={(e) => setAssignmentDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='dueDate' className='form-label'>
                            Due Date
                        </label>
                        <input
                            type='date'
                            className='form-control'
                            id='dueDate'
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='selectedClass' className='form-label'>
                            Select Class
                        </label>
                        <select
                            className='form-control'
                            id='selectedClass'
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            required
                        >
                            <option value='' disabled>Select a class</option>
                            <option></option>
                            <option></option>
                            
                        </select>
                    </div>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={handleAssignmentCreation}
                    >
                        Create Assignment
                    </button>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default TeacherAssignments;
