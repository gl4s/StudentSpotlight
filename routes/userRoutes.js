// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

router.get('/members', authenticateToken, userController.getSchoolMembers);
router.get('/types', authenticateToken, userController.getUserTypes);
router.delete('/delete/:userId', authenticateToken, userController.deleteUser);
router.put('/edit/:userId', authenticateToken, userController.editUser);

module.exports = router;