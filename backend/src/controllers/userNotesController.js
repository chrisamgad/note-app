const express = require('express');
const router = express.Router();
const { noteValidator } = require('../validators/noteValidator.js');
const { UserNote } = require('../models');
const NoteDTO = require('../dtos/NoteDTO');
const responseHelper = require('../utils/responseHelper.js');
const authenticate = require('../middleware/auth');
const AppError = require('../utils/appError');

/**
 * @route   POST /notes
 * @desc    Create a new user note
 * @access  Private
 */
router.post('/', authenticate, noteValidator, async (req, res, next) => {
  const { title, body } = req.body;

  try {
    const newNote = await UserNote.create({
      title,
      body,
      authorId: req.user.id
    });

    return responseHelper.success(res, { note: NoteDTO.fromModel(newNote) }, 'Note created successfully', 201);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /notes
 * @desc    Get all notes for the authenticated user
 * @access  Private
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const notes = await UserNote.findAll({
      where: { authorId: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    return responseHelper.success(res, { notes: NoteDTO.fromModels(notes) });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /notes/:noteId
 * @desc    Get a specific note for the authenticated user
 * @access  Private
 */
router.get('/:noteId', authenticate, async (req, res, next) => {
  try {
    const note = await UserNote.findOne({
      where: { id: req.params.noteId, authorId: req.user.id },
    });

    if (!note) {
      throw new AppError('Note not found', 404);
    }

    return responseHelper.success(res, { note: NoteDTO.fromModel(note) });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /notes/:noteId
 * @desc    Update a note for the authenticated user
 * @access  Private
 */
router.put('/:noteId', authenticate, noteValidator, async (req, res, next) => {
  const { title, body } = req.body;

  try {
    const note = await UserNote.findOne({
      where: { id: req.params.noteId, authorId: req.user.id },
    });

    if (!note) {
      throw new AppError('Note not found or unauthorized', 404);
    }

    note.title = title;
    note.body = body;

    await note.save();

    return responseHelper.success(res, { note: NoteDTO.fromModel(note) }, 'Note updated successfully');
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /notes/:noteId
 * @desc    Delete a note for the authenticated user
 * @access  Private
 */
router.delete('/:noteId', authenticate, async (req, res, next) => {
  try {
    const note = await UserNote.findOne({
      where: { id: req.params.noteId, authorId: req.user.id },
    });

    if (!note) {
      throw new AppError('Note not found or unauthorized', 404);
    }

    await note.destroy();

    return responseHelper.success(res, {}, 'Note deleted successfully');
  } catch (error) {
    next(error);
  }
});

module.exports = router;