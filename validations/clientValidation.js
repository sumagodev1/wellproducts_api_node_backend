const { body, param } = require('express-validator');

exports.validateClient = [
  body('clientName')
    .notEmpty()
    .withMessage('Client name is required')
    .isString()
    .withMessage('Client name must be a string'),
];

exports.validateClientId = [
  param('id')
    .isInt()
    .withMessage('Client ID must be an integer'),
];
