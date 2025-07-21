const { body, param } = require('express-validator');

exports.validateFacilities = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  body('shortDesc')
    .notEmpty()
    .withMessage('Short description is required')
    .isString()
    .withMessage('Short description must be a string'),
];

exports.validateFacilitiesId = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer'),
];
