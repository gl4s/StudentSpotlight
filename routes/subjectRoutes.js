const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Route to add a new subject
router.post('/add', subjectController.addSubject);

// Route to delete a subject
router.delete('/delete/:courseId', subjectController.deleteSubject);

// Route to get all subjects
router.get('/all', subjectController.getAllSubjects);

module.exports = router;
