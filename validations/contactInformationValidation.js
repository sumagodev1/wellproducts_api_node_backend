const { body, param } = require('express-validator');

const validateContactInformation = [
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isNumeric()
    .withMessage('Phone number must contain only digits')
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 digits'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 5, max: 255 })
    .withMessage('Address must be between 5 and 255 characters'),
];

const validateContactInformationId = [
  param('id')
    .notEmpty()
    .withMessage('ID is required')
    .isInt({ gt: 0 })
    .withMessage('ID must be a positive integer'),
];

module.exports = { validateContactInformation, validateContactInformationId };
