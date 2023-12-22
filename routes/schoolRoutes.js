const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// Register School
router.post('/register', schoolController.registerSchool);

// Fetching all schools from db
router.get('/schools', schoolController.getAllSchools);

module.exports = router;


