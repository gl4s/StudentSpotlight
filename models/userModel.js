// models/userModel.js
const pool = require('../db');
// const bcrypt = require('bcrypt');
const { DB_NAME } = process.env;

class UserModel {
  async createUser(username, passwordHash, userType, firstName, lastName, email, phoneNumber, birthdate) {
    try {
      const [result] = await pool.query(
        'INSERT INTO Users (Username, PasswordHash, UserType, FirstName, LastName, Email, PhoneNumber, BirthDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [username, passwordHash, userType, firstName, lastName, email, phoneNumber, birthdate]
      );

      return result.insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getNextUserID() {
    try {
      const [result] = await pool.query('SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?', [DB_NAME, 'Users']);
      return result[0].AUTO_INCREMENT;
    } catch (error) {
      console.error('Error getting next user ID:', error);
      throw error;
    }
  }

  async getAvailableTeachers(requestingSchoolId) {
    try {
      console.log('requestingSchoolId:', requestingSchoolId);
      const result = await pool.query(
        `SELECT UserID, FirstName, LastName 
         FROM Users 
         WHERE UserType = 'teacher' 
         AND ClassID IS NULL
         AND Username LIKE ?`, [requestingSchoolId + '.%']
      );
  
      console.debug('Available teachers:', result);
      return result;
    } catch (error) {
      console.error('Error getting available teachers:', error);
      throw error;
    }
  }

  async getAvailableStudents(requestingSchoolId) {
    try {
      console.log('requestingSchoolId:', requestingSchoolId);
      const result = await pool.query(
        `SELECT UserID, FirstName, LastName 
         FROM Users 
         WHERE UserType = 'student' 
         AND ClassID IS NULL
         AND Username LIKE ?`, [requestingSchoolId + '.%']
      );

      console.debug('Available students:', result);
      return result;
    } catch (error) {
      console.error('Error getting available students:', error);
      throw error;
    }
  }

  async updateUsersClassId(classId) {
    try {
      const updateQuery = 'UPDATE Users SET ClassID = NULL WHERE ClassID = ?';
      await pool.query(updateQuery, [classId]);
      console.debug('Users updated successfully for classId:', classId);
    } catch (error) {
      console.error('Error updating users ClassID:', error);
      throw error;
    }
  }

}

const userModelInstance = new UserModel();

module.exports = userModelInstance;

