import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/StudentTable.css";

const StudentTable = ({ classId, refreshData }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

  const fetchStudents = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/classes/students/${classId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data.students);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchAvailableStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); //debug the token
      const decodedToken = parseJwt(token);
      const userId = decodedToken.userId;
      console.log("before the get api call:", decodedToken.userId);
      const response = await axios.get(`http://localhost:3001/api/classes/availablestudents`, {
        params: {
          userId: decodedToken.userId,
        },
      });

      const data = response.data;
      setAvailableStudents(data.students.flat());
    } catch (error) {
      console.error('Error fetching available students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchAvailableStudents();
  }, [classId, refreshData]);

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

  const handleStudentSelect = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleCheckboxChange = (event, studentId) => {
    setSelectedCheckboxes({
      ...selectedCheckboxes,
      [studentId]: event.target.checked,
    });
  };

  const addStudent = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/classes/${classId}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: selectedStudent }),
      });
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      const data = await response.json();
      if (data.success) {
        console.log(data);
        setSelectedStudent('');
        refreshData(); // Refresh data after adding student
      } else {
        throw new Error('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const deleteClass = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this class?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:3001/api/classes/${classId}`);
        if (response.status === 200) {
          alert("Class deleted successfully!");
          refreshData(); // Refresh data after deleting class
        } else {
          throw new Error('Failed to delete class');
        }
      } catch (error) {
        console.error('Error deleting class:', error);
      }
    }
  };

  const removeSelectedStudent = async () => {
    const confirmDelete = window.confirm("Are you sure you want to remove selected students from this class?");
    if (confirmDelete) {
      try {
        const selectedStudentIds = Object.keys(selectedCheckboxes).filter(studentId => selectedCheckboxes[studentId]);
        const response = await axios.delete(`http://localhost:3001/api/classes/${classId}/students`, {
          data: { studentIds: selectedStudentIds }
        });
        if (response.status === 200) {
          alert("Selected students from this Class removed successfully!");
          refreshData();
          fetchStudents();
          fetchAvailableStudents();
        } else {
          throw new Error('Failed to remove selected students');
        }
      } catch (error) {
        console.error('Error removing selected students:', error);
      }
    }
  };


  return (
    <div className="student-table-container">
      <h3>Students</h3>
      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table className="student-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th className="checkbox-column">Select</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student?.Username}</td>
                <td>{student?.FirstName}</td>
                <td>{student?.LastName}</td>
                <td className="checkbox-column">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={selectedCheckboxes[student.UserID] || false}
                    onChange={(event) => handleCheckboxChange(event, student.UserID)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <select
          id="studentSelect"
          name="studentSelect"
          value={selectedStudent}
          onChange={handleStudentSelect}
        >
          <option value="" disabled>
            Select Student
          </option>
          {availableStudents.filter(student => typeof student.UserID === 'number').map((student) => {
            return (
              <option key={student.UserID} value={student.UserID}>
                {student.FirstName} {student.LastName}
              </option>
            );
          })}
        </select>
        <div className='action-buttons'>
          <button onClick={addStudent}>Add Selected Students</button>
          <button onClick={removeSelectedStudent}>Remove Selected Student</button>
          <button className='delete-button' onClick={deleteClass}>Delete Class</button>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
