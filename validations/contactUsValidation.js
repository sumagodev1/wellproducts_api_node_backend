const { body, param } = require('express-validator');

const validateContactUs = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is required and must be a valid email'),
  body('message').notEmpty().withMessage('Message is required'),
  body('phone').isNumeric().withMessage('Phone must be a valid number'),
  body('subject').notEmpty().withMessage('Subject is required'),

];

const validateContactUsId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

module.exports = { validateContactUs, validateContactUsId };
