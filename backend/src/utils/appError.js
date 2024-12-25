class AppError extends Error { // custom error class
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode || 500;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // note: we are distinguishing operational errors from programming errors

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;