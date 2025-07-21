const { body, param } = require('express-validator');

const validateProductDetails = [
  body('productName').notEmpty().withMessage('Product name is required'),
   body('description').notEmpty().withMessage('Description name is required'),
];

const validateProductDetailsId = [
  param('id').isInt().withMessage('ID must be an integer'),
];

module.exports = { validateProductDetails, validateProductDetailsId };
