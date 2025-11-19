// models/Activity.js - Activity model schema

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: [true, 'User ID is required']
  },
  taskTitle: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  taskDescription: {
    type: String,
    required: [true, 'Task description is required'],
    trim: true
  },
  hoursSpent: {
    type: Number,
    required: [true, 'Hours spent is required'],
    min: [0, 'Hours spent cannot be negative'],
    max: [24, 'Hours spent cannot exceed 24 hours']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  productivityScore: {
    type: Number,
    required: [true, 'Productivity score is required'],
    min: [0, 'Productivity score must be between 0 and 10'],
    max: [10, 'Productivity score must be between 0 and 10']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
activitySchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Activity', activitySchema);