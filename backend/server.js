// server.js - Main entry point for the application

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// ✅ FIX 14: Proper CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ✅ FIX 15: Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User routes
app.use('/api', activityRoutes); // Activity routes

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Team Activity & Performance Tracker API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});