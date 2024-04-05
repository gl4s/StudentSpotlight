// controllers/schoolController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schoolModel = require('../models/schoolModel');
require('dotenv').config()
const tokenSecretKey = process.env.JWT_SECRET;
console.log(process.env.JWT_SECRET);

// Register School
exports.registerSchool = async (req, res) => {
  try {
    const { schoolName, schoolIdentifier, address, password } = req.body;

    // Validate schoolIdentifier
    if (!schoolIdentifier) {
      return res.status(400).json({ error: 'School Identifier is required' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Start a database transaction
    await schoolModel.beginTransaction();

    try {
      // Insert school into the Schools table
      const schoolId = await schoolModel.insertSchool(schoolName, schoolIdentifier, address);

      // Insert school admin user into the Users table
      const userId = await schoolModel.insertSchoolAdmin(schoolIdentifier, passwordHash);

      // Commit the transaction
      await schoolModel.commitTransaction();

      // Create a JWT token
      const token = jwt.sign({ userId, userType: 'schooladmin' }, tokenSecretKey, { expiresIn: '2h' });

      // Send the token back to the client
      res.json({ schoolId, userId, token });
    } catch (error) {
      // Rollback the transaction in case of an error
      await schoolModel.rollbackTransaction();
      throw error; // Re-throw the error after rollback
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Fetching all schools from db
exports.getAllSchools = async (req, res) => {
  try {
    console.log('Fetching schools...');
    const schools = await schoolModel.getAllSchools();
    console.log('Schools fetched successfully:', schools);

    res.json(schools);
  } catch (error) {
    console.error('Error fetching schools', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getSchoolById = async (req, res) => {
  try {
    const school = await schoolModel.getSchoolById(req.params.schoolId);
    res.json(school);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching school data' });
  }
};

exports.editSchoolAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;

    const result = await schoolModel.editSchoolAdmin(userId, updatedData);

    res.json(result);
  } catch (error) {
    console.error('Error editing school admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};