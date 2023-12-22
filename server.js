const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

// Require middleware
const authenticateToken = require('./middlewares/authMiddleware');

// Require route handlers
const authRoutes = require('./routes/authRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const mainPageRoute = require('./routes/mainPageRoute');

// Use middleware and routes
app.use('/api/auth', authRoutes);
app.use('/api/mainpage', authenticateToken, mainPageRoute);
app.use('/api/school', schoolRoutes);

// Server start check
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
