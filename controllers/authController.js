// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
// const authenticateToken = require('../middlewares/authMiddleware');
require('dotenv').config()
const tokenSecretKey = process.env.JWT_SECRET;
console.log(process.env.JWT_SECRET)

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, password, userType } = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      'INSERT INTO Users (Username, PasswordHash, Salt, UserType) VALUES (?, ?, ?, ?)',
      [username, passwordHash, salt, userType]
    );

    const userId = result.insertId;

    const token = jwt.sign({ userId, userType }, tokenSecretKey, { expiresIn: '1h' });

    res.json({ userId, userType, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login User (without authentication)
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch user from the database
    const [userResult] = await pool.query('SELECT * FROM Users WHERE Username = ?', [username]);
    const user = userResult[0];

    if (user && (await bcrypt.compare(password, user.PasswordHash))) {
      const token = jwt.sign({ userId: user.UserID, userType: user.UserType }, tokenSecretKey, {
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
};

// Verify User (with authentication)
exports.verifyUser = (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
};
