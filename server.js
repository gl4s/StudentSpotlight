const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const db = require('./db');
dotenv.config();
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
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const subjectassignmentRoutes = require('./routes/subjectassignmentRoutes');
const gradesRoutes = require('./routes/gradesRoutes');

// Use middleware and routes
app.use('/api/auth', authRoutes);
app.use('/api/mainpage', authenticateToken, mainPageRoute);
app.use('/api/school', schoolRoutes);
app.use('/api/user', userRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/subjectassignment', subjectassignmentRoutes);
app.use('api/grades', gradesRoutes);


//Initialize default Admin
const createDefaultAdmin = async () => {
  try {
    const [adminResult] = await db.query('SELECT * FROM Users WHERE Username = ? AND UserType = ?', [process.env.ADMIN_DEFAULT_NAME, 'systemadmin']);
    if (adminResult.length === 0) {
      const defaultAdminPassword = process.env.ADMIN_DEFAULT_PASSWORD;
      const hashedPassword = await bcrypt.hash(defaultAdminPassword, 10);
      await db.query('INSERT INTO Users (Username, PasswordHash, UserType) VALUES (?, ?, ?)', [process.env.ADMIN_DEFAULT_NAME, hashedPassword, 'systemadmin']);
      console.log('Default admin user created successfully.');
    } else {
      console.log('Admin user already exists in the database.');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
};

// Server start check
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  createDefaultAdmin();
});
