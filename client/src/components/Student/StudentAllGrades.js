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
                                <option value="">Subjects</option>
                            </select>
                        </form>
                    </div>

                    <table className="table table-bordered table-striped table-responsive">
                            <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Grade</th>
                                <th>Signing Teacher</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className='col-md-2'></td>
                                <td className='col-md-2'></td>
                                <td className='col-md-2'></td>
                            </tr>

                            <tr>
                                <td className='col-md-2'></td>
                                <td className='col-md-2'></td>
                                <td className='col-md-2'></td>
                            </tr>

                            <tr>
                                <td className='col-md-2'></td>
                                <td className='col-md-2'></td>
                                <td className='col-md-2'></td>
                            </tr>

                            <tr>
                                <td className='col-md-2'></td>
                                <td className='col-md-2'></td>
                                <td className='col-md-2'></td>
                            </tr>

                            <tr>
                                <td className='col-md-2'></td>
                                <td className='col-md-2'></td>
                                <td className='col-md-2'></td>
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