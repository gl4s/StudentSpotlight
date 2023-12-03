// authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../db');
const schoolRoutes = require('./schoolRoutes'); // Import schoolRoutes

// Register User
router.post('/register', async (req, res) => {
  try {
    const { username, password, userType } = req.body;

    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user into the database
    const [result] = await pool.query(
      'INSERT INTO Users (Username, PasswordHash, Salt, UserType) VALUES (?, ?, ?, ?)',
      [username, passwordHash, salt, userType]
    );

    const userId = result.insertId;

    // Create a JWT token
    const token = jwt.sign({ userId, userType }, 'test123', { expiresIn: '1h' });

    res.json({ userId, userType, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch user from the database
    const [result] = await pool.query('SELECT * FROM Users WHERE Username = ?', [username]);
    const user = result[0];

    // Check if user exists and verify password
    if (user && (await bcrypt.compare(password, user.PasswordHash))) {
      // Create a JWT token
      const token = jwt.sign({ userId: user.UserID, userType: user.UserType }, 'your_secret_key', {
        expiresIn: '1h',
      });

      res.json({ userId: user.UserID, userType: user.UserType, token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.use('/school', schoolRoutes);

module.exports = router;
