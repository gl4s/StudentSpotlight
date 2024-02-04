import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar.js';
import Footer from '../Footer.js';
import '../../css/Navbar.css';
import '../../css/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const TeacherClasses = () => {
    const navigate = useNavigate();

    const handleBack = () => {
       
        navigate('/teacher'); 
    };

    const handleAddGrade = () => {
        
        console.log('Add Grade clicked');
    };
    
    const handleEditGrade = () => {
        
        console.log('Edit Grade clicked');
    };

    return (
        <div className='container main-container'>
            <Navbar />

            <div className='content-box'>
                <div className="d-flex flex-column align-items-start">
                    <div className="mb-4">
                        <button className="btn btn-primary mr-2" onClick={handleBack}>
                            Back
                        </button>
                        <form>
                            <select className='form-control form-control-sm mt-4'>
                                <option value="">Classes</option>
                            </select>
                        </form>
                    </div>

                    <table className="table table-bordered table-striped">
                        <tbody>
                            <tr>
                                <td>Student Name</td>
                                <td>Grades</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="mt-3">
                        <button className="btn btn-primary mr-2" onClick={() => handleAddGrade()}>
                            Add Grade
                        </button>
                        <button className="btn btn-secondary" onClick={() => handleEditGrade()}>
                            Edit Grade
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TeacherClasses;
