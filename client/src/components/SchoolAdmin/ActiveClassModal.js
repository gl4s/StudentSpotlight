import React from 'react';
import Modal from 'react-modal';
import '../../css/SchoolMetaEditModal.css';

Modal.setAppElement('#root');

const ActiveClassModal = ({ isOpen, onClose, /* add necessary props */ }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="edit-modal">
      <div className="modal-header">
        <h2>Active Classes</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
      {/* Add your modal content for viewing active classes */}
      <div>
        <p>Content specific to viewing active classes goes here.</p>
      </div>
    </Modal>
  );
};

export default ActiveClassModal;
