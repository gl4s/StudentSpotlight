const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');


// POST endpoint to add a new class
router.post('/addclass', classController.addClass);

// GET endpoint to fetch available teachers
router.get('/availableteachers', classController.getAvailableTeachers);

//GET endpoint to fetch available students
router.get('/availablestudents', classController.getAvailableStudents);

// GET endpoint to fetch classes with associated teachers
router.get('/activeclasses', classController.getClassesWithTeachers);

// GET endpoint to fetch students by school and class
router.get('/students/:classId', classController.getStudentsByClass);

// POST endpoint to add a student to a class
router.post('/:classId/students', classController.addStudentToClass);

// DELETE endpoint to delete selected class 
router.delete('/:classId', classController.deleteClass);

// DELETE endpoint to remove selected students from a class
router.delete('/:classId/students', classController.removeSelectedStudents);

module.exports = router;