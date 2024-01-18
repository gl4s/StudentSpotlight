const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// POST endpoint to add a new class
router.post('/addclass', classController.addClass);

module.exports = router;