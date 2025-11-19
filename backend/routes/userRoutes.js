// routes/userRoutes.js - User management routes

const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { admin } = require('../middlewares/adminMiddleware');

// @route   POST /api/users
// @desc    Create a new user
// @access  Public (or you can protect it with admin middleware)
router.post('/', createUser);

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', protect, admin, getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', protect, getUserById);

module.exports = router;