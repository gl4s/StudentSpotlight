// authMiddleware.js
require('dotenv').config()
const tokenSecretKey = process.env.JWT_SECRET;
console.log(process.env.JWT_SECRET);
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Received Token:', token);

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, tokenSecretKey, (err, user) => {
        if (err) {
            console.error('Token Verification Error:', err);
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user;
        console.log('req.user set:', req.user);
        next();
    });
};


module.exports = authenticateToken;


