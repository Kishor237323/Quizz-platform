const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './config.env' });

// Import routes
console.log('Loading auth routes...');
const authRoutes = require('./routes/auth');
console.log('Auth routes loaded successfully');

console.log('Loading quiz routes...');
const quizRoutes = require('./routes/quizzes');
console.log('Quiz routes loaded successfully');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (with error handling)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.log('MongoDB Connection Error:', err.message);
    console.log('Server will continue without database connection');
  }
};

connectDB();

// Routes
console.log('Setting up auth routes...');
app.use('/api/auth', authRoutes);
console.log('Auth routes setup complete');

console.log('Setting up quiz routes...');
app.use('/api/quizzes', quizRoutes);
console.log('Quiz routes setup complete');

// Health check route
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.json({ 
    success: true, 
    message: 'Quiz Platform API is running',
    timestamp: new Date().toISOString()
  });
});

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api`);
}); 