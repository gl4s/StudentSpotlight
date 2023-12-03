// schoolRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../db');

// Register School
router.post('/register', async (req, res) => {
  try {
    const { schoolName, schoolIdentifier, address, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    // Start a database transaction
    await pool.query('START TRANSACTION');

    // Insert school into the Schools table
    const [schoolResult] = await pool.query(
      'INSERT INTO Schools (SchoolName, SchoolIdentifier, Address) VALUES (?, ?, ?)',
      [schoolName, schoolIdentifier, address]
    );

    const schoolId = schoolResult.insertId;

    // Insert school admin user into the Users table
    const [userResult] = await pool.query(
      'INSERT INTO Users (Username, PasswordHash, Salt, UserType) VALUES (?, ?, ?, ?)',
      [schoolIdentifier, passwordHash, salt, 'schooladmin']
    );

    const userId = userResult.insertId;

    // Commit the transaction
    await pool.query('COMMIT');

    // Create a JWT token
    const token = jwt.sign({ userId, userType: 'schooladmin' }, 'test123', { expiresIn: '1h' });

    // Send the token back to the client
    res.json({ schoolId, userId, token });
  } catch (error) {
    // Rollback the transaction in case of an error
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

