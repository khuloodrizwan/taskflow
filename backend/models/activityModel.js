// models/activityModel.js - Updated Activity model schema to match frontend

const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    required: [true, 'Activity title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Activity description is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Development', 'Design', 'Testing', 'Meeting', 'Documentation', 'Research', 'Other'],
    default: 'Other'
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [0, 'Duration cannot be negative']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for better query performance
activitySchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Activity', activitySchema);