const express = require('express');
const router = express.Router();
const subjectAssignmentController = require('../controllers/subjectassignmentController');

// Route to get all subject assignments
router.get('/all', subjectAssignmentController.getAllSubjectAssignments);

// Route to assign a subject to a teacher
router.post('/assign', subjectAssignmentController.assignSubject);

// Route to delete a subject assignment
router.delete('/delete/:assignmentId', subjectAssignmentController.deleteSubjectAssignment);

// Route to get all teachers
router.get('/teachers', subjectAssignmentController.getAllTeachers);

module.exports = router;