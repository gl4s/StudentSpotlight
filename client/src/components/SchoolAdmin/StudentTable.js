import React, { useState, useEffect } from 'react';

const StudentTable = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Fetch students belonging to the selected class
        const response = await fetch(`http://localhost:3001/api/classes/${classId}/students`);
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
        // Fetch available students within the school but not assigned to any class
        const token = localStorage.getItem('token');
        const { schoolId } = parseJwt(token);

        const response = await fetch(`http://localhost:3001/api/schools/${schoolId}/students/available`);
        if (!response.ok) {
          throw new Error('Failed to fetch available students');
        }
        const data = await response.json();
        setAvailableStudents(data.students);
      } catch (error) {
        console.error('Error fetching available students:', error);
      }
    };

    fetchStudents();
    fetchAvailableStudents();
  }, [classId]);

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

  const addStudent = async () => {
    try {
      // Add the selected student to the class
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
      // After adding the student, fetch updated list of students
      const data = await response.json();
      setStudents([...students, data.student]);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div>
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
              {/* Add more columns if needed */}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.Username}</td>
                <td>{student.FirstName}</td>
                <td>{student.LastName}</td>
                {/* Add more columns if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <h3>Add Student</h3>
        <select value={selectedStudent} onChange={handleStudentSelect}>
          <option value="">Select Student</option>
          {availableStudents.map((student) => (
            <option key={student.StudentID} value={student.StudentID}>
              {student.FirstName} {student.LastName}
            </option>
          ))}
        </select>
        <button onClick={addStudent}>Add Student</button>
      </div>
    </div>
  );
};

export default StudentTable;
