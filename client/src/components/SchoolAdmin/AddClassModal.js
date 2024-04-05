import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../css/SchoolMetaEditModal.css';
import axios from 'axios';

Modal.setAppElement('#root');

const AddClassModal = ({ isOpen, onClose }) => {
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [selectedClassName, setSelectedClassName] = useState('');
  const [selectedHeadTeacher, setSelectedHeadTeacher] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAvailableTeachers = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = parseJwt(token);
        const userId = decodedToken.userId;

        const response = await axios.get(`http://localhost:3001/api/classes/availableteachers`, {
          params: {
            userId: decodedToken.userId,
          },
        });
        

        setAvailableTeachers(response.data.teachers.flat());
      } catch (error) {
        console.error('Error fetching available teachers:', error);
      }
    };

    fetchAvailableTeachers();
  }, [successMessage]);

  const handleClassNameChange = (e) => {
    setSelectedClassName(e.target.value);
  };

  const handleHeadTeacherChange = (e) => {
    setSelectedHeadTeacher(e.target.value);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the input fields are empty
    if (selectedClassName === '' || selectedHeadTeacher === '') {
      alert('Please fill all the fields before submitting');
      return;
    }

    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Decode the token
    const decodedToken = parseJwt(token);

    // Extract the schoolId
    const schoolId = decodedToken.schoolID;

    try {
      const response = await axios.post('http://localhost:3001/api/classes/addclass', {
        className: selectedClassName,
        headTeacherId: selectedHeadTeacher,
        schoolId: schoolId,
      });

      if (response.data.success) {
        setSuccessMessage('Class added successfully.');
        setSelectedClassName('');
        setSelectedHeadTeacher('');

      } else {
        console.error('Error adding class:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="edit-modal">
      <div className="modal-header">
        <h2>Add New Class</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="ClassName">Class Name:</label>
            <input
              type="text"
              id="ClassName"
              name="ClassName"
              value={selectedClassName}
              onChange={handleClassNameChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="HeadTeacher">Head Teacher:</label>
            <select
              id="HeadTeacher"
              name="HeadTeacher"
              value={selectedHeadTeacher}
              onChange={handleHeadTeacherChange}
            >
              <option value="" disabled>
                Select Head Teacher
              </option>
              {availableTeachers.map((teacher) => {
                if (teacher && teacher.UserID && teacher.FirstName && teacher.LastName) {
                  console.log(teacher.UserID, teacher.FirstName, teacher.LastName);
                  return (
                    <option key={teacher.UserID} value={teacher.UserID}>
                      {teacher.FirstName} {teacher.LastName}
                    </option>
                  );
                } else {
                  return null;
                }
              })}

            </select>
          </div>

          <button type="submit">Add Class</button>
        </form>
      </div>
    </Modal>
  );
};

export default AddClassModal;
