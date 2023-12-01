// Server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

const mainPageRoute = require('./routes/controllers/mainPageRoute');
app.use('/api/mainpage',mainPageRoute);

//Server start check
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
