const { body, param } = require('express-validator');

const validateOurTeam = [
  body('name').notEmpty().withMessage('Name is required'),
  body('designation').notEmpty().withMessage('Designation is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('empID').notEmpty().withMessage('Employee ID is required'),
  body('experience').notEmpty().withMessage('Experience is required'),
];

const validateOurTeamId = [
  param('id').isInt().withMessage('ID must be an integer')
];

module.exports = { validateOurTeam, validateOurTeamId };
