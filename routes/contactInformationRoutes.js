const express = require('express');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const { validateContactInformation, validateContactInformationId } = require('../validations/contactInformationValidation');
const {
  addContactInformation,
  updateContactInformation,
  getContactInformation,
  isActiveStatus,
  isDeleteStatus
} = require('../controllers/contactInformationController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/create-contactinformation',uploadFiles, authenticateToken, validateContactInformation, addContactInformation);
router.put('/update-contactinformation/:id',uploadFiles, authenticateToken, validateContactInformation, validateContactInformationId, updateContactInformation);
router.get('/get-contactinformation', getContactInformation);
router.get('/find-contactinformation', authenticateToken, getContactInformation);
router.put('/isactive-contactinformation/:id', authenticateToken, validateContactInformationId, isActiveStatus);
router.delete('/isdelete-contactinformation/:id', authenticateToken, validateContactInformationId, isDeleteStatus);

module.exports = router;
