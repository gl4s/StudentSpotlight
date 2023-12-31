import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../css/MembersSchoolAdminComp.css';

const MembersSchoolAdminComp = () => {
  const [schoolMembers, setSchoolMembers] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchSchoolMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/api/school/members?filter=${filter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSchoolMembers(response.data.members);
      } catch (error) {
        console.error('Error fetching school members:', error);
      }
    };

    fetchSchoolMembers();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="dashboard-container">
      <div className="box">
        <div className="box-header">
          <Link to="/schooladmin" className="back-button">
            Back
          </Link>
          <h2>School Members</h2>
        </div>
        <div className="box-content">
          <div className="filter-section">
            <label htmlFor="filter">Filter by:</label>
            <select id="filter" value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <ul>
            {schoolMembers.map((member) => (
              <li key={member.id}>
                {member.username} - {member.userType}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MembersSchoolAdminComp;
