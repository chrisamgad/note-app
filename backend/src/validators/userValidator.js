const { body, check, validationResult } = require("express-validator");
const responseHelper = require('../utils/responseHelper');

const registerValidator = [
  check('name').notEmpty().withMessage('Name is required').trim().escape(),
  check('email').isEmail().withMessage('Must be a valid email'),
  check('password').notEmpty().withMessage('Password is required'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHelper.fail(res, errors.array()[0].msg, 400);
    }
    next();
  },
];

const loginValidator = [
  check('email').isEmail().withMessage('Must be a valid email'),
  check('password').notEmpty().withMessage('Password is required'),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHelper.fail(res, errors.array()[0].msg, 400);
    }
    next();
  },
];

module.exports = { registerValidator, loginValidator };
