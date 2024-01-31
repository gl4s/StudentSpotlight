const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
// const authController = require('../controllers/authController');

// Register School
router.post('/register', schoolController.registerSchool);

// Fetching all schools from db
router.get('/schools', schoolController.getAllSchools);

// Fetching a specific school from db
router.get('/schools/:schoolId', schoolController.getSchoolById);

// Update School
// router.put('/schools/:schoolId', schoolController.updateSchool);

// Update User
// router.put('/users/:userId', schoolController.updateUser);

//Update both at once
router.put('/editSchoolAdmin/:userId', schoolController.editSchoolAdmin);


module.exports = router;


