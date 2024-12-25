const { body, check, validationResult } = require("express-validator");
const responseHelper = require('../utils/responseHelper');

const noteValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title of note is required"),

  body("body")
    .notEmpty()
    .withMessage("Body of note is required"),
    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseHelper.fail(res, errors.array()[0].msg, 400);
    }
    next();
  },
];


module.exports = { noteValidator };
