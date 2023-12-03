const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:3000/client', // or the origin of your frontend
}));

// Middleware to parse JSON requests
app.use(express.json());

const mainPageRoute = require('./routes/controllers/mainPageRoute');
const authRoutes = require('./routes/controllers/authRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/mainpage', mainPageRoute);

// Server start check
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

