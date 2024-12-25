const responseHelper = require('../utils/responseHelper');

const errorHandler = (err, req, res, next) => {
  // if the error is operational, use its status code and message
  // otherwise, default to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  const message = err.isOperational ? err.message : 'Something went wrong';

  
  if (process.env.NODE_ENV === 'development') { // log the error in development mode
    console.error('ERROR:', err);
  }

  return responseHelper.fail(res, message, statusCode);
};

module.exports = errorHandler;