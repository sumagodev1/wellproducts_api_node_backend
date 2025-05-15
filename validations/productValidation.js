const { body, param } = require('express-validator');

exports.validateProduct = [
  body('title')
    .notEmpty()
    .withMessage('Product Title is required')
    .isString()
    .withMessage(' Product Title must be a string'),
  body('shortDesc')
    .notEmpty()
    .withMessage('Short description is required')
    .isString()
    .withMessage('Short description must be a string'),
];

exports.validateProductId = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer'),
];
