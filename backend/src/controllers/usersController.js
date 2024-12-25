const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseHelper = require('../utils/responseHelper');
const { registerValidator, loginValidator } = require('../validators/userValidator.js')
const { User } = require('../models');
const UserDTO = require('../dtos/UserDTO');
const authenticate = require('../middleware/auth');
const AppError = require('../utils/appError.js');

/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerValidator, async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    // hash the password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // create the user
    const newUser = await User.create({
      name,
      email,
      password: password_hash,
    });

    return responseHelper.success(res, { user: UserDTO.fromModel(newUser) }, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /login
 * @desc    Authenticate user and return a token
 * @access  Public
 */
router.post('/login', loginValidator, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // compare the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '10h' } // Token expires in 10 hours
    );

    // set the token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 10 * 60 * 60 * 1000, // 10 hours in milliseconds
    });

    return responseHelper.success(res, { user: UserDTO.fromModel(user) }, 'Login successful');
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /logout
 * @desc    Logout the user by clearing the authentication cookie
 * @access  Public
 */
router.post('/logout', (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });
    return responseHelper.success(res, {}, 'Logout successful', 200);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /profile
 * @desc    Get the authenticated user's profile
 * @access  Private
 */
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return responseHelper.success(res, { user: UserDTO.fromModel(user) }, 'Profile fetched successfully');
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /profile
 * @desc    Update the authenticated user's profile
 * @access  Private
 */
router.put('/profile', authenticate, async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (name) user.name = name;
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    await user.save();

    return responseHelper.success(res, { user: UserDTO.fromModel(user) }, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /delete
 * @desc    Delete the authenticated user's account
 * @access  Private
 */
router.delete('/delete', authenticate, async (req, res, next) => {
  try {

    const user = await User.findByPk(req.user.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    await user.destroy();

    return responseHelper.success(res, {}, 'User account deleted successfully');
  } catch (error) {
    next(error);
  }
});

module.exports = router;