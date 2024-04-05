// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

//GET all members associated with the Logged in school
router.get('/members', authenticateToken, userController.getSchoolMembers);

//GET Loads in user types for a dropbox to be able to filter the table 
router.get('/types', authenticateToken, userController.getUserTypes);

//DELETE Delete a Selected User from Users table
router.delete('/delete/:userId', authenticateToken, userController.deleteUser);

//PUT Updates the selected Users data 
router.put('/edit/:userId', authenticateToken, userController.editUser);

module.exports = router;

