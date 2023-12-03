const express = require('express');
const router = express.Router();

//Routes for main page
router.get('/',(res) => {
    res.json({message: 'Welcome to Student Spotlight Main Page'});
})

module.exports = router;