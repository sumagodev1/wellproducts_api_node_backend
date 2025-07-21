const express = require('express');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const {
  addFacilities,
  updateFacilities,
  getFacilities,
  isActiveStatus,
  isDeleteStatus,
} = require('../controllers/facilitiesController');
const authenticateToken = require('../middleware/auth');
const {
  validateFacilities,
  validateFacilitiesId,
} = require('../validations/facilitiesValidation');

const router = express.Router();

router.post('/create-facilities', uploadFiles, authenticateToken, validateFacilities, addFacilities);
router.put('/update-facilities/:id', uploadFiles, authenticateToken, validateFacilities, validateFacilitiesId, updateFacilities);
router.get('/get-facilities', getFacilities);
router.put('/isactive-facilities/:id', authenticateToken, validateFacilitiesId, isActiveStatus);
router.delete('/isdelete-facilities/:id', authenticateToken, validateFacilitiesId, isDeleteStatus);

module.exports = router;
