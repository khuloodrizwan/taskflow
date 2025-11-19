// db.js - MongoDB connection configuration

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;