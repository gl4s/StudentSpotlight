const express = require('express');
const router = express.Router();

//Routes for main page
router.get('/',(res,req) => {
    res.json({message: 'Welcome to Student Spotlight Main Page'});
})

module.exports = router;