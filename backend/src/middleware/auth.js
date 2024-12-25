const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      // throw an AppError with status code 401 (Unauthorized)
      throw new AppError('Access denied. No token provided.', 401);
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {

    // handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      next(new AppError('Token expired.', 401));
    } else if (error.name === 'JsonWebTokenError') {
      next(new AppError('Invalid token.', 401));
    } else {
      next(new AppError('Authentication failed.', 401));
    }
  }
};