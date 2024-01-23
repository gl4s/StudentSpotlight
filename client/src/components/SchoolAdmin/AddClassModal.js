import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../css/SchoolMetaEditModal.css';
import axios from 'axios';

Modal.setAppElement('#root');

const AddClassModal = ({ isOpen, onClose }) => {
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [selectedClassName, setSelectedClassName] = useState('');
  const [selectedHeadTeacher, setSelectedHeadTeacher] = useState('');

  // useEffect(() => {
  //   fetch('http://localhost:3001/api/classes/availableteachers')
  // .then((response) => response.json())
  // .then((data) => {
  //   console.log(data[0]);
  //   setAvailableTeachers(data[0]);
  // })
  // .catch((error) => console.error('Error fetching teachers:', error));
  // }, []);

  useEffect(() => {
    const fetchAvailableTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/classes/availableteachers');
        console.log(response.data);
        setAvailableTeachers(response.data.teachers.flat()); // Change this line
      } catch (error) {
        console.error('Error fetching schools', error);
      }
    };
    fetchAvailableTeachers()
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Decode the token
    const decodedToken = parseJwt(token);

    // Extract the schoolId
    const schoolId = decodedToken.schoolID;

    fetch('http://localhost:3001/api/classes/addclass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        className: selectedClassName,
        headTeacherId: selectedHeadTeacher,
        schoolId: schoolId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onClose();
        } else {
          console.error('Error adding class:', data.error);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="edit-modal">
      <div className="modal-header">
        <h2>Add New Class</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>

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
                console.log(teacher.UserID, teacher.FirstName, teacher.LastName);
                return (
                  <option key={teacher.UserID} value={teacher.UserID}>
                    {teacher.FirstName} {teacher.LastName}
                  </option>
                );
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
