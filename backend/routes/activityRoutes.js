// routes/activityRoutes.js - Activity management routes

const express = require('express');
const router = express.Router();
const {
  createActivity,
  getUserActivities,
  getAllActivities,
  getAnalytics
} = require('../controllers/activityController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

// @route   POST /api/activity
// @desc    Create a new activity
// @access  Private
router.post('/activity', protect, createActivity);

// @route   GET /api/activity/:userId
// @desc    Get all activities for a specific user
// @access  Private
router.get('/activity/:userId', protect, getUserActivities);

// @route   GET /api/admin/all-activities
// @desc    Get all activities (Admin only)
// @access  Private/Admin
router.get('/admin/all-activities', protect, admin, getAllActivities);

// @route   GET /api/analytics/:userId
// @desc    Get weekly analytics for a user
// @access  Private
router.get('/analytics/:userId', protect, getAnalytics);

module.exports = router;