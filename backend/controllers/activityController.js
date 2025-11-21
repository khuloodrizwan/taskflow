// controllers/activityController.js - Updated to match frontend data structure

const Activity = require('../models/activityModel');
const User = require('../models/userModel');

// @desc    Create a new activity
// @route   POST /api/activity
// @access  Private
exports.createActivity = async (req, res) => {
  try {
    const { user, title, description, category, priority, status, duration, date } = req.body;

    // ✅ FIX 1: Updated validation to match frontend fields
    if (!user || !title || !description || !category || !priority || !status || duration === undefined || !date) {
      console.log('Validation failed. Received data:', req.body); // Debug log
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
        received: req.body
      });
    }

    // Verify user exists
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // ✅ FIX 2: Create activity with correct field names
    const activity = await Activity.create({
      user,
      title,
      description,
      category,
      priority,
      status,
      duration: Number(duration),
      date: date || Date.now()
    });

    // Populate user details
    await activity.populate('user', 'name email role');

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: activity
    });
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating activity',
      error: error.message
    });
  }
};

// @desc    Get all activities for a specific user
// @route   GET /api/activity/:userId
// @access  Private
exports.getUserActivities = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // ✅ FIX 3: Updated to use 'user' field instead of 'userId'
    const activities = await Activity.find({ user: userId })
      .populate('user', 'name email role')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    console.error('Get user activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error.message
    });
  }
};

// @desc    Get all activities (Admin only)
// @route   GET /api/admin/all-activities
// @access  Private/Admin
exports.getAllActivities = async (req, res) => {
  try {
    // Find all activities with user details
    const activities = await Activity.find()
      .populate('user', 'name email role')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    console.error('Get all activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching all activities',
      error: error.message
    });
  }
};

// @desc    Get weekly analytics for a user
// @route   GET /api/analytics/:userId
// @access  Private
exports.getAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // ✅ FIX 4: Updated to use 'user' field
    const activities = await Activity.find({
      user: userId,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });

    // ✅ FIX 5: Calculate analytics based on new schema
    const totalActivities = activities.length;
    const totalHours = activities.reduce((sum, activity) => sum + (activity.duration || 0), 0);
    const averageDuration = totalActivities > 0 ? totalHours / totalActivities : 0;

    // Group activities by day
    const dailyActivities = [];
    const dateMap = {};

    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      dateMap[dateKey] = {
        date: dateKey,
        count: 0,
        totalDuration: 0
      };
    }

    // Fill in actual data
    activities.forEach(activity => {
      const dateKey = new Date(activity.date).toISOString().split('T')[0];
      if (dateMap[dateKey]) {
        dateMap[dateKey].count += 1;
        dateMap[dateKey].totalDuration += activity.duration || 0;
      }
    });

    dailyActivities.push(...Object.values(dateMap));

    // Category breakdown
    const categoryBreakdown = activities.reduce((acc, activity) => {
      const existing = acc.find(item => item._id === activity.category);
      if (existing) {
        existing.count += 1;
        existing.totalDuration += activity.duration || 0;
      } else {
        acc.push({
          _id: activity.category,
          count: 1,
          totalDuration: activity.duration || 0
        });
      }
      return acc;
    }, []);

    // Priority breakdown
    const priorityBreakdown = activities.reduce((acc, activity) => {
      const existing = acc.find(item => item._id === activity.priority);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({
          _id: activity.priority,
          count: 1
        });
      }
      return acc;
    }, []);

    // Status breakdown
    const statusBreakdown = activities.reduce((acc, activity) => {
      const existing = acc.find(item => item._id === activity.status);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({
          _id: activity.status,
          count: 1
        });
      }
      return acc;
    }, []);

    // Find most productive day
    const mostProductiveDay = dailyActivities.reduce((max, day) => 
      day.count > max.count ? day : max
    , { count: 0, date: 'N/A' });

    res.status(200).json({
      success: true,
      totalActivities,
      totalHours: parseFloat(totalHours.toFixed(2)),
      averageDuration: parseFloat(averageDuration.toFixed(2)),
      mostProductiveDay: new Date(mostProductiveDay.date).toLocaleDateString('en-US', { weekday: 'short' }),
      dailyActivities,
      categoryBreakdown,
      priorityBreakdown,
      statusBreakdown
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
};