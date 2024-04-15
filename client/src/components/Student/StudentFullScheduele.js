import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import '../../css/Navbar.css';
import '../../css/Footer.css';
import '../../css/studentFullScheduele.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentFullScheduele = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/student'); 
    };

    return (
        <div className='container main-container container-fluid'>
            <Navbar />

            <div className='content-box'>
                <button className="btn btn-primary mb-3" onClick={handleBack}>
                    Back
                </button>
                <h2>Weekly Time Schedule</h2>
                <div className='table-responsive'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th className="col-md-2">Monday</th>
                                <th className="col-md-2">Tuesday</th>
                                <th className="col-md-2">Wednesday</th>
                                <th className="col-md-2">Thursday</th>
                                <th className="col-md-2">Friday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>7:30 AM - 8:15 AM</td>
                                <td className="col-md-2"></td>
                                <td className="col-md-2"></td>
                                <td className="col-md-2"></td>
                                <td className="col-md-2"></td>
                                <td className="col-md-2"></td>
                            </tr>
                            
                            <tr>
                            <td>8:25 AM - 09:10 AM</td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                        </tr>
                        
                        <tr>
                            <td>9:20 AM - 10:05 AM</td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                        </tr>

                        <tr>
                            <td>10:20 AM - 11:05 AM</td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                        </tr>

                        <tr>
                            <td>11:15 AM - 12:00 AM</td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                        </tr>

                        <tr>
                            <td>12:20 AM - 13:05 AM</td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                        </tr>

                        <tr>
                            <td>13:20 AM - 14:05 AM</td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                        </tr>

                        <tr>
                            <td>14:10 AM - 14:55 AM</td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
                        </tr>

                        <tr>
                            <td>15:00 AM - 15:45 AM</td>
                            <td className='col-md-2'></td>
                            <td className='col-md-2'></td>
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

export default StudentFullScheduele;
