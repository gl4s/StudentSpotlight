// gradesRoutes.js

const express = require('express');
const router = express.Router();
const gradesController = require('../controllers/gradesController');

// add a grade for a student
router.post('/student/:studentId/addgrade', gradesController.addGrade);

// get grades for a student
router.get('/student/:studentId/grades', gradesController.getGrades);

// delete a selected students grade
router.delete('/grade/:gradeId', gradesController.deleteGrade);

module.exports = router;
