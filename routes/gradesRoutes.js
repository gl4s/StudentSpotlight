// gradesRoutes.js

const express = require('express');
const router = express.Router();
const gradesController = require('../controllers/gradesController');

// Route to add a grade
router.post('/addgrade', gradesController.addGrade);

// Route to get grades for a student(for a selected student only)
router.get('/:studentId', gradesController.getGrades);

// Route to delete a selected students grade
router.delete('/:gradeId', gradesController.deleteGrade);

module.exports = router;
