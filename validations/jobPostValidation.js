const { body, param } = require('express-validator');

const validateJobPost = [
  body('jobtitle').notEmpty().withMessage('Job title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('education').notEmpty().withMessage('Education is required'),
  body('experience').notEmpty().withMessage('Experience is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
];

const validateJobPostId = [
  param('id').isInt().withMessage('ID must be an integer')
];

module.exports = { validateJobPost, validateJobPostId };
