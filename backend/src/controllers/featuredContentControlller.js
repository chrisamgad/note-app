const express = require('express');
const router = express.Router();
const { FeaturedContent } = require('../models');
const responseHelper = require('../utils/responseHelper.js');
const AppError = require('../utils/appError');

/**
 * @route   GET /
 * @desc    Get all featured content for home page
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const featuredContent = await FeaturedContent.findAll({
      order: [['createdAt', 'DESC']],
    });

    return responseHelper.success(res, { featuredContent }, 'Featured content retrieved successfully');
  } catch (error) {
    next(error);
  }
});

module.exports = router;