import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/NewUserSchoolAdminComp.css';

const NewUserSchoolAdminComp = () => {
  const [userType, setUserType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState(null);
  const [file, setFile] = useState(null);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userType, firstName, lastName, email, phoneNumber, birthdate);
    if (!userType || !firstName || !lastName || !email || !phoneNumber || !birthdate) {
      console.error('All fields are required.');
      return;
    }

    try {
      const formData = new FormData();
      if (userType) formData.append('userType', userType);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);

      if (birthdate) {
        formData.append('birthdate', birthdate.toISOString().split('T')[0]);
      }

      if (file) {
        formData.append('file', file);
      }

      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        console.error('HTTP Status:', response.status);
        const text = await response.text();
        console.error('Response Text:', text);
        return;
      }

      const responseData = await response.json();
      console.log(responseData);

      setUserType('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setBirthdate(null);
      setFile(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <div className="new-user-school-admin-container">
      <div className='new-user-header'>
        <Link to="/schooladmin" className="back-link">
          Back
        </Link>
        <h2 className='new-user-title'>Create New User</h2>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        <div className="form-group">
          <label className="label" htmlFor="userType">User Type:</label>
          <select className="select" id="userType" value={userType} onChange={handleChange(setUserType)} required>
            <option value="" disabled>
              Select User Type 
            </option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleChange(setFirstName)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleChange(setLastName)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange(setEmail)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handleChange(setPhoneNumber)}
            required
          />
        </div>
        <div className="form-group" id='birthdateLabel'>
          <label htmlFor="birthdate">Birthdate:</label>
          <input
            type="date"
            id="birthdate"
            value={birthdate ? birthdate.toISOString().split('T')[0] : ''}
            onChange={handleChange((value) => setBirthdate(new Date(value)))}
            required
            className='date-input'
          />
        </div>
        <button type="submit" className='submit-button'>Create User</button>
      </form>
    </div>
  );
};

export default NewUserSchoolAdminComp;
