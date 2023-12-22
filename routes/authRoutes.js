// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const schoolRoutes = require('./schoolRoutes');
const authenticateToken = require('../middlewares/authMiddleware');

// Register User
router.post('/register', authController.registerUser);

// Login User (without authentication for frontend fetch)
router.post('/login', authController.loginUser);

// Verify User (with authentication)
router.get('/verify', authenticateToken, authController.verifyUser);

// Protected route for SchoolAdmin
router.get('/schooladmin', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route for SchoolAdmin' });
});

router.use('/school', schoolRoutes);

module.exports = router;

