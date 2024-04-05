// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const userModel = require('../models/userModel');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const csvParser = require('csv-parser');
const fs = require('fs');
require('dotenv').config()
const tokenSecretKey = process.env.JWT_SECRET;
console.log(process.env.JWT_SECRET)

const generatePassword = (firstName, year) => {
  if (!firstName) {
    throw new Error('firstName is required for password generation.');
  }

  const yearOfBirth = year;
  const password = `${firstName.toLowerCase()}${yearOfBirth}`;
  return password;
};



exports.registerUser = async (req, res) => {
  try {
    if (req.file) {

      const results = await parseCSV(req.file.path);

      for (const user of results) {
        await handleUserRegistration(user, req, res);
      }
    } else {

      await handleUserRegistration(req.body, req, res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function handleUserRegistration(user, req, res) {

  const { userType, firstName, lastName, email, phoneNumber, birthdate } = user;
  console.log(firstName);

  // Check if firstName is defined
  if (!firstName) {
    return res.status(400).json({ error: 'First name is required for registration.' });
  }

  const UserID = req.user.userId;
  const birthdateObj = new Date(birthdate);
  const yearOfBirth = birthdateObj?.getFullYear().toString().slice(-2);
  const nextUserID = await userModel.getNextUserID();
  const username = `${UserID}.${userType === 'student' ? '1' : '2'}.${yearOfBirth}.${nextUserID}`;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const password = generatePassword(firstName, yearOfBirth);
  const passwordHash = await bcrypt.hash(password, salt);

  if (userType !== 'student' && userType !== 'teacher') {
    return res.status(400).json({ error: 'Invalid userType' });
  }

  const userId = await userModel.createUser(
    username,
    passwordHash,
    userType,
    firstName,
    lastName,
    email,
    phoneNumber,
    birthdate
  );

  console.log(`User ${userId} registered successfully. Username: ${username} Pw: ${password} bh: ${birthdate}`);
}

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Extract school and employeeId from the username
    const [school, employeeId] = username.split('-');

    console.log('Extracted school:', school);
    console.log('Extracted employeeId:', employeeId);

    if (employeeId.includes('.')) {
      // Teacher or Student login
      const [schoolId, userType, plc, userId] = employeeId.split('.');
      console.log(schoolId, userType, plc, userId);
      const userTypeLabel = userType === '2' ? 'teacher' : 'student';

      // Fetch school from the database


      const [schoolResult] = await pool.query('SELECT * FROM Schools WHERE SchoolName = ?', [school]);
      const schoolInfo = schoolResult[0];
      console.log(schoolResult[0]);
      if (!schoolInfo) {
        return res.status(401).json({ error: 'Invalid school credentials(1)' });
      }

      // Fetch user from the database
      const [userResult] = await pool.query('SELECT * FROM Users WHERE UserID = ?', [userId]);
      const user = userResult[0];

      if (user && (await bcrypt.compare(password, user.PasswordHash))) {
        const token = jwt.sign({ userId: user.UserID, userType: userTypeLabel, schoolName: school, schoolID: schoolId }, tokenSecretKey, {
          expiresIn: '2h',
        });

        res.json({ userId: user.UserID, userType: userTypeLabel, token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      // Check if the extracted employeeId exists in the database
      const [userResult] = await pool.query('SELECT * FROM Users WHERE Username = ?', [employeeId]);
      const user = userResult[0];

      if (!user) {
        // User not found
        return res.status(401).json({ error: 'User not found' });
      }

      if (user.UserType === 'schooladmin') {
        // SchoolAdmin login
        // Fetch school from the database
        const [schoolResult] = await pool.query('SELECT * FROM Schools WHERE SchoolName = ? AND SchoolIdentifier = ?', [school, employeeId]);
        const schoolInfo = schoolResult[0];

        if (!schoolInfo) {
          return res.status(401).json({ error: 'Invalid school credentials' });
        }

        if (user && (await bcrypt.compare(password, user.PasswordHash))) {
          const token = jwt.sign({ userId: user.UserID, userType: user.UserType, schoolName: school, schoolID: schoolInfo.SchoolID }, tokenSecretKey, {
            expiresIn: '2h',
          });

          res.json({ userId: user.UserID, userType: user.UserType, token });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } else if (user.UserType === 'systemadmin') {
        // System Admin login
        if (user && (await bcrypt.compare(password, user.PasswordHash))) {
          const token = jwt.sign({ userId: user.UserID, userType: user.UserType, schoolName: null, schoolID: null }, tokenSecretKey, {
            expiresIn: '2h',
          });

          res.json({ userId: user.UserID, userType: user.UserType, token });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } else {
        // Invalid user type
        res.status(401).json({ error: 'Invalid user type' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Verify User
exports.verifyUser = (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
};
