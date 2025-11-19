// controllers/activityController.js - Activity management logic

const Activity = require('../models/activityModel');
const User = require('../models/userModel');

// @desc    Create a new activity
// @route   POST /api/activity
// @access  Private
exports.createActivity = async (req, res) => {
  try {
    const { userId, taskTitle, taskDescription, hoursSpent, date, productivityScore } = req.body;

    // Validate input
    if (!userId || !taskTitle || !taskDescription || hoursSpent === undefined || productivityScore === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create activity
    const activity = await Activity.create({
      userId,
      taskTitle,
      taskDescription,
      hoursSpent,
      date: date || Date.now(),
      productivityScore
    });

    // Populate user details
    await activity.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Activity logged successfully',
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
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find all activities for the user, sorted by date (newest first)
    const activities = await Activity.find({ userId })
      .populate('userId', 'name email')
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
      .populate('userId', 'name email role')
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
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Find activities from the last 7 days
    const activities = await Activity.find({
      userId,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });

    // Calculate analytics
    const totalHours = activities.reduce((sum, activity) => sum + activity.hoursSpent, 0);
    const totalActivities = activities.length;
    const averageProductivity = totalActivities > 0
      ? (activities.reduce((sum, activity) => sum + activity.productivityScore, 0) / totalActivities).toFixed(2)
      : 0;

    // Prepare graph-ready data (group by day)
    const graphData = {};
    
    // Initialize last 7 days with zero values
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      graphData[dateKey] = {
        date: dateKey,
        hours: 0,
        productivity: 0,
        count: 0
      };
    }

    // Fill in actual data
    activities.forEach(activity => {
      const dateKey = new Date(activity.date).toISOString().split('T')[0];
      if (graphData[dateKey]) {
        graphData[dateKey].hours += activity.hoursSpent;
        graphData[dateKey].productivity += activity.productivityScore;
        graphData[dateKey].count += 1;
      }
    });

    // Calculate average productivity per day
    const chartData = Object.values(graphData).map(day => ({
      date: day.date,
      hours: parseFloat(day.hours.toFixed(2)),
      avgProductivity: day.count > 0 ? parseFloat((day.productivity / day.count).toFixed(2)) : 0
    }));

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        summary: {
          totalHours: parseFloat(totalHours.toFixed(2)),
          totalActivities,
          averageProductivity: parseFloat(averageProductivity)
        },
        chartData
      }
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