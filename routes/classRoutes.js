const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// POST endpoint to add a new class
router.post('/addclass', classController.addClass);

// GET endpoint to fetch available teachers
router.get('/availableteachers', classController.getAvailableTeachers);

module.exports = router;