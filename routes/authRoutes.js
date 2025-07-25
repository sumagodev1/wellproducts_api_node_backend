const express = require('express');
const { loginUser, changePassword, getProfile, verifyCaptcha } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

router.post('/verify-captcha', verifyCaptcha);

router.post('/login', [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], loginUser);

router.put('/change-password', authenticateToken, [
  body('oldPassword').notEmpty().withMessage('Old password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], changePassword);

router.get('/get-profile', authenticateToken, getProfile);

module.exports = router;
