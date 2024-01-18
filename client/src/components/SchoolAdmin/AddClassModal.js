import React from 'react';
import Modal from 'react-modal';
import '../../css/SchoolMetaEditModal.css';

Modal.setAppElement('#root');

const AddClassModal = ({
  isOpen,
  onClose,
  onAdd,
  classNameOptions, // Assume this is an array of available classes
  selectedClassName,
  onSelectClassName,
  selectedHeadTeacher,
  onSelectHeadTeacher,
  teachersOptions, // Assume this is an array of available teachers
  /* Add other necessary props */
}) => {
  const handleClassNameChange = (e) => {
    onSelectClassName(e.target.value);
  };

  const handleHeadTeacherChange = (e) => {
    onSelectHeadTeacher(e.target.value);
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
        <form>
          <div className="form-field">
            <label htmlFor="ClassName">Class Name:</label>
            <input
              type="text"
              id="ClassName"
              name="ClassName"
              value={selectedClassName || ''}
              onChange={handleClassNameChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="HeadTeacher">Head Teacher:</label>
            <select
              id="HeadTeacher"
              name="HeadTeacher"
              value={selectedHeadTeacher || ''}
              onChange={handleHeadTeacherChange}
            >
              <option value="" disabled>
                Select Head Teacher
              </option>
              {/* {teachersOptions.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))} */}
            </select>
          </div>
        </form>

        <button onClick={onAdd}>Add Class</button>
      </div>
    </Modal>
  );
};

export default AddClassModal;
