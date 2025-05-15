const { body, param } = require('express-validator');

exports.validateHomePageBanner = [
  // body('img')
  //   .notEmpty()
  //   .withMessage('Image is required')
  //   .isString()
  //   .withMessage('Image must be a proper size'),
];

exports.validateHomePageBannerId = [
  param('id')
    .isInt()
    .withMessage('ID must be an integer'),
];
