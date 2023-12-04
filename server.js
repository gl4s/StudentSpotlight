const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

const mainPageRoute = require('./routes/controllers/mainPageRoute');
const authRoutes = require('./routes/controllers/authRoutes');
const schoolRoutes = require('./routes/controllers/schoolRoutes');

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use('/api/auth', authRoutes);
// app.use('/api/mainpage', mainPageRoute);
app.use('/api/mainpage', schoolRoutes);

// Server start check
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

