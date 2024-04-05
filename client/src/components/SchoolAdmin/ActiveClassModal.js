import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../css/ActiveClassModal.css';
import StudentTable from './StudentTable';


Modal.setAppElement('#root');

const ActiveClassModal = ({ isOpen, onClose }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchClasses = async (token) => {
    try {
      const decodedToken = parseJwt(token);
      const userId = decodedToken.schoolID;
      console.log("before the get api call:", decodedToken.userId);
      const response = await fetch(`http://localhost:3001/api/classes/activeclasses?userId=${userId}`);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch classes');
      }
      const data = await response.json();
      console.log('Data:', data);
      setClasses(data.classes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchClasses(token);
  }, [isOpen]);

  const handleClassSelect = (classItem) => {
    setSelectedClass(classItem);
    setSuccessMessage('');
  };

  const refreshData = () => {
    const token = localStorage.getItem('token');
    fetchClasses(token);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="edit-modal">
      <div className="modal-header">
        <h2>Active Classes</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
      <div className="class-container">
        <div className="horizontal-scroll-container">
          {loading ? (
            <p>Loading...</p>
          ) : classes.length === 0 ? (
            <p>No classes found</p>
          ) : (
            <div className="card-container">
              {classes.map((classItem) => (
                <div key={classItem.ClassID} className="card" onClick={() => handleClassSelect(classItem)}>
                  <h3>{classItem.ClassName}</h3>
                  <p>Head Teacher: {classItem.HeadTeacherFirstName} {classItem.HeadTeacherLastName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedClass && (
        <div className="selected-class-details">
          <h3>Selected Class: {selectedClass.ClassName} |  Head Teacher: {selectedClass.HeadTeacherFirstName} {selectedClass.HeadTeacherLastName}</h3>
          <hr></hr>
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="table-container">
            <StudentTable classId={selectedClass.ClassID} refreshData={refreshData} />
          </div>
        </div>
      )}
    </Modal>

  );
};

export default ActiveClassModal;
