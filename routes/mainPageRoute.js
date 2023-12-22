const express = require('express');
const router = express.Router();

router.get('/',(res) => {
    res.json({message: 'Welcome to Student Spotlight Main Page'});
})

module.exports = router;