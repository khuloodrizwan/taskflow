// middleware/adminMiddleware.js - Admin role verification middleware

// Check if user has admin role
exports.admin = (req, res, next) => {
  // This middleware should be used after the 'protect' middleware
  // so req.user is already available
  
  if (req.user && req.user.role === 'admin') {
    next(); // User is admin, proceed
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
};