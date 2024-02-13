import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import '../../css/Navbar.css';
import '../../css/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentAllGrades = () => {

    const navigate = useNavigate();

    const handleBack = () => {
       
        navigate('/student'); 
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
                            <thead>
                            <tr>
                                <th>Class</th>
                                <th>Grade</th>
                                <th>Signing Teacher</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    </div>

            <Footer />
        </div>
    );
};

export default StudentAllGrades;