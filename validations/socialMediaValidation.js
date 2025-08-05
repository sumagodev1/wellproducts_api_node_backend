const { body, param } = require('express-validator');

exports.validateSocialMedia = [
  body('medialinks')
    .notEmpty()
    .withMessage('Social media link is required')
    .isURL({
      protocols: ['http', 'https','www.'],
      require_protocol: true,
    })
    .withMessage('Please provide a valid URL starting with http:// or https:// or www.')
];

exports.validateSocialMediaId = [
  param('id')
    .isInt({ gt: 0 })
    .withMessage('ID must be a positive integer'),
];
