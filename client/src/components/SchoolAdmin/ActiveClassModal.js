  import React, { useState, useEffect } from 'react';
  import Modal from 'react-modal';
  import '../../css/ActiveClassModal.css';
  import StudentTable from './StudentTable';


  Modal.setAppElement('#root');

  const ActiveClassModal = ({ isOpen, onClose }) => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
      const fetchClasses = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/classes/activeclasses');
          if (!response.ok) {
            throw new Error('Failed to fetch classes');
          }
          const data = await response.json();
          setClasses(data.classes);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      };

      fetchClasses();
    }, [isOpen]);

    const handleClassSelect = (classItem) => {
      setSelectedClass(classItem);
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
            <h3>Selected Class: {selectedClass.ClassName}</h3>
            <p>Head Teacher ID: {selectedClass.HeadTeacherID}</p>
            {/* <StudentTable students={selectedClass.students} /> */}
            <button>Add Student</button>
          </div>
        )}
      </Modal>
    );
  };

  export default ActiveClassModal;
