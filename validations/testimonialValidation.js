const { body, param } = require('express-validator');

const validateTestimonial = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces')
    .custom(async (value) => {
      const existing = await db.Testimonial.findOne({ where: { name: value } });
      if (existing) {
        throw new Error('Name already exists');
      }
    }),

  // Company Name: required, valid format, no duplicates
  body('company_Name')
    .notEmpty().withMessage('Company_Name is required')
    .matches(/^[a-zA-Z0-9\s.-]+$/).withMessage('Company name can only contain letters, numbers, spaces, dots, and hyphens')
    .custom(async (value) => {
      const existing = await db.Testimonial.findOne({ where: { company_Name: value } });
      if (existing) {
        throw new Error('Company name already exists');
      }
    }),

  // Review: required, length 10–500, safe characters
  body('review')
    .notEmpty().withMessage('Review is required')
    .isLength({ min: 10, max: 500 }).withMessage('Review must be between 10 and 500 characters')
    .matches(/^[a-zA-Z0-9\s.,'-]+$/).withMessage('Review can only contain letters, numbers, spaces, and common punctuation'),

  // Experience: required, number between 0 and 50
  body('experience')
    .notEmpty().withMessage('Experience is required')
    .isInt({ min: 0, max: 50 }).withMessage('Experience must be a number between 0 and 50'),

  // Star: required, integer 1–5
  body('star')
    .notEmpty().withMessage('Star rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Star rating must be between 1 and 5')
];

const validateTestimonialId = [
  param('id').isInt().withMessage('ID must be an integer')
];

module.exports = { validateTestimonial, validateTestimonialId };

