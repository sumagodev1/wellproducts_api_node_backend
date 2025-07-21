const express = require('express');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const {
  validateSocialMedia,
  validateSocialMediaId,
} = require('../validations/socialMediaValidation');
const {
  addSocialMedia,
  updateSocialMedia,
  getSocialMedia,
  isActiveStatus,
  isDeleteStatus,
} = require('../controllers/socialMediaController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// upload.single('img') 

router.post('/create-socialmedia', uploadFiles, authenticateToken,validateSocialMedia, addSocialMedia);
router.put('/update-socialmedia/:id', uploadFiles, authenticateToken,  validateSocialMedia, validateSocialMediaId, updateSocialMedia);
router.get('/get-socialmedia', getSocialMedia);
router.get('/find-socialmedia',authenticateToken, getSocialMedia);
router.put('/isactive-socialmedia/:id', authenticateToken,validateSocialMediaId, isActiveStatus);
router.delete ('/isdelete-socialmedia/:id', authenticateToken,validateSocialMediaId, isDeleteStatus);

module.exports = router;
