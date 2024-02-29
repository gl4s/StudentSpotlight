import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import { Link } from 'react-router-dom';
import '../../css/MembersSchoolAdminComp.css';

const MembersSchoolAdminComp = () => {
  const [schoolMembers, setSchoolMembers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [userTypes, setUserTypes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);


  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/user/types', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserTypes(response.data.userTypes);
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    };

    fetchUserTypes();
  }, []);

  useEffect(() => {
    fetchSchoolMembers(); // Initial fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]); // Re-fetch when the filter changes

  const fetchSchoolMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/api/user/members?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchoolMembers(response.data.members);
    } catch (error) {
      console.error('Error fetching school members:', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleEdit = (user) => {
    setIsEditModalOpen(true);
    setSelectedUserData(user);
  };


  const handleEditUser = async (editedData) => {
    try {
      const token = localStorage.getItem('token');
      const formattedData = {
        ...editedData,
        BirthDate: editedData.BirthDate ? new Date(editedData.BirthDate).toISOString() : null,
      };

      await axios.put(
        `http://localhost:3001/api/user/edit/${selectedUserData.UserID}`,
        formattedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Updated Data:', formattedData);

      fetchSchoolMembers();
      setSelectedUserData(null);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleDelete = async (userId) => {
    console.log(`Delete user with ID: ${userId}`);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSchoolMembers((prevMembers) => prevMembers.filter((member) => member.UserID !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='container-fluid members-school-admin'>
      <div className="dashboard-container">
        <div className="box">
          <div className="box-header">
            <Link to="/schooladmin" className="btn btn-secondary back-button">
              Back
            </Link>
            <h2>School Members</h2>
          </div>
          <div className="box-content">
            <div className="filter-section">
              <label htmlFor="filter">Filter by:</label>
              <select className="form-select" id="filter" value={filter} onChange={handleFilterChange}>
                <option value="all">All</option>
                {userTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="table-container table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>UserType</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>BirthDate</th>
                    <th>UserID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolMembers.map((member) => (
                    <tr key={member.UserID}>
                      <td>{member.Username}</td>
                      <td>{member.UserType}</td>
                      <td>{member.FirstName}</td>
                      <td>{member.LastName}</td>
                      <td>{member.BirthDate}</td>
                      <td>{member.UserID}</td>
                      <td>
                        <button className="btn btn-info" onClick={() => handleEdit(member)}>
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(member.UserID)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEditUser}
        userData={selectedUserData}
      />
    </div>
  );
};

export default MembersSchoolAdminComp;
