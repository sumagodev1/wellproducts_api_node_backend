const express = require('express');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const { validateJobPost, validateJobPostId } = require('../validations/jobPostValidation');
const {
  addJobPost,
  updateJobPost,
  getJobPost,
  isActiveStatus,
  isDeleteStatus
} = require('../controllers/jobPostController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/create-jobpost',uploadFiles, authenticateToken, validateJobPost, addJobPost);
router.put('/update-jobpost/:id',uploadFiles, authenticateToken, validateJobPost, validateJobPostId, updateJobPost);
router.get('/get-jobpost', getJobPost);
router.get('/find-jobpost', authenticateToken, getJobPost);
router.put('/isactive-jobpost/:id', authenticateToken, validateJobPostId, isActiveStatus);
router.delete('/isdelete-jobpost/:id', authenticateToken, validateJobPostId, isDeleteStatus);

module.exports = router;
