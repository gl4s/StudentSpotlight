import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../css/EditUserModal.css';

Modal.setAppElement('#root');

const EditUserModal = ({ isOpen, onClose, onEdit, userData }) => {
  const [editableFields, setEditableFields] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    BirthDate: '',
  });

  useEffect(() => {
    setEditableFields(userData ? {
      FirstName: userData.FirstName || '',
      LastName: userData.LastName || '',
      Email: userData.Email || '',
      PhoneNumber: userData.PhoneNumber || '',
      BirthDate: userData.BirthDate || '',
    } : {
      FirstName: '',
      LastName: '',
      Email: '',
      PhoneNumber: '',
      BirthDate: '',
    });
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onEdit(editableFields);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="edit-user-modal">
      <div className="modal-header">
        <h2>Edit User</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
      <form>
        {Object.keys(editableFields).map((field) => (
          <div key={field} className="form-field">
            <label htmlFor={field}>{field}:</label>
            <input
              type="text"
              id={field}
              name={field}
              value={editableFields[field] || ''}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <button type="button" className="save-button" onClick={handleSubmit}>
          Save Changes
        </button>
      </form>
    </Modal>
  );
};

export default EditUserModal;
