import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SchoolMetaEditModal from './SchoolMetaEditModal';
import AddClassModal from './AddClassModal';
import ActiveClassModal from './ActiveClassModal';
import '../../css/SchoolMeta.css';


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

const SchoolMetaComp = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [isActiveClassModalOpen, setIsActiveClassModalOpen] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [editableFields, setEditableFields] = useState({
    SchoolName: '',
    SchoolIdentifier: '',
    Address: '',
    SchoolLevel: '',
    EducationLevel: '',
    Username: '',
    Password: '',
    Email: '',
    PhoneNumber: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      setSchoolName(decodedToken.schoolName);
    } else {
      // Handle the case where there's no token
      // You may want to redirect to the login page or show an error message
    }
  }, []);


  const handleOpenEditModal = async () => {
    setIsEditModalOpen(true);

    // Fetch existing data when opening the modal
    try {
      const token = localStorage.getItem('token');
      const decodedToken = parseJwt(token);
      const schoolId = decodedToken.schoolID;

      console.log('Fetching school data for school ID:', schoolId); //debug log

      const response = await axios.get(`http://localhost:3001/api/school/schools/${schoolId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const schoolData = response.data;
      console.log('Fetched school data:', schoolData); //debug log
      setEditableFields(schoolData);
    } catch (error) {
      console.error('Error fetching school data:', error);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenAddClassModal = () => {
    setIsAddClassModalOpen(true);
  };

  const handleCloseAddClassModal = () => {
    setIsAddClassModalOpen(false);
  };

  const handleOpenActiveClassModal = () => {
    setIsActiveClassModalOpen(true);

  };

  const handleCloseActiveClassModal = () => {
    setIsActiveClassModalOpen(false);
  };

  return (
    <div className="school-meta-comp">
      <div className="box">
        <div className="header">
          <Link to="/schooladmin" className="back-button">
            Back
          </Link>
          <h2 className="title">{schoolName}</h2>
        </div>

        <div className="modal-buttons">
          <button onClick={handleOpenEditModal}>Edit School Info</button>
        </div>

        <div className="modal-buttons">
          <button onClick={handleOpenAddClassModal}>Add New Class</button>
        </div>

        <div className="modal-buttons">
          <button onClick={handleOpenActiveClassModal}>Active Classes</button>
        </div>
      </div>

      <SchoolMetaEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        editableFields={editableFields}
        setEditableFields={setEditableFields}
        parseJwt={parseJwt}
      />

      <AddClassModal
        isOpen={isAddClassModalOpen}
        onClose={handleCloseAddClassModal}
      />

      <ActiveClassModal
        isOpen={isActiveClassModalOpen}
        onClose={handleCloseActiveClassModal}
      />
    </div>
  );
};

export default SchoolMetaComp;
