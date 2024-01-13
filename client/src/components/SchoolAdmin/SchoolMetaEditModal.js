import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../css/SchoolMetaEditModal.css';

Modal.setAppElement('#root');

const SchoolMetaEditModal = ({ isOpen, onClose, onEdit, editableFields, setEditableFields }) => {
    const [newPassword, setNewPassword] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableFields((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePasswordChange = () => {
        setEditableFields((prevData) => ({ ...prevData, 'Password': newPassword }));
    };

    const handleSubmit = () => {
        handlePasswordChange();
        onEdit(editableFields);
        onClose();
    };


    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="edit-modal">
            <div className="modal-header">
                <h2>Edit User</h2>
                <button onClick={onClose} className="close-button">
                    Close
                </button>
            </div>
            <form>
                <div className="form-field">
                    <label htmlFor="SchoolName">School Name:</label>
                    <input
                        type="text"
                        id="SchoolName"
                        name="SchoolName"
                        value={editableFields.SchoolName || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="SchoolIdentifier">School Identifier:</label>
                    <input
                        type="text"
                        id="SchoolIdentifier"
                        name="SchoolIdentifier"
                        value={editableFields.SchoolIdentifier || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="Address">Address:</label>
                    <input
                        type="text"
                        id="Address"
                        name="Address"
                        value={editableFields.Address || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="SchoolLevel">School Level:</label>
                    <input
                        type="text"
                        id="SchoolLevel"
                        name="SchoolLevel"
                        value={editableFields.SchoolLevel || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="EducationLevel">Education Level:</label>
                    <input
                        type="text"
                        id="EducationLevel"
                        name="EducationLevel"
                        value={editableFields.EducationLevel || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="Username">Username:</label>
                    <input
                        type="text"
                        id="Username"
                        name="Username"
                        value={editableFields.Username || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="NewPassword">New Password:</label>
                    <input
                        type="password"
                        id="NewPassword"
                        name="NewPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="Email">Email:</label>
                    <input
                        type="text"
                        id="Email"
                        name="Email"
                        value={editableFields.Email || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="PhoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="PhoneNumber"
                        name="PhoneNumber"
                        value={editableFields.PhoneNumber || ''}
                        onChange={handleInputChange}
                    />
                </div>

                

                <button type="button" className="save-button" onClick={handleSubmit}>
                    Save Changes
                </button>
            </form>
        </Modal>
    );
};

export default SchoolMetaEditModal;
