const express = require('express');
const { validateContactUs, validateContactUsId } = require('../validations/contactUsValidation');
const {
  addContactUs,
  getContactUs,
  updateContactUs,
  deleteContactUs,
} = require('../controllers/contactUsController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add-contactus', validateContactUs, addContactUs);
router.get('/find-contactus', authenticateToken, getContactUs);
router.put('/update/:id', authenticateToken, validateContactUsId, validateContactUs, updateContactUs);
router.delete('/delete/:id', authenticateToken, validateContactUsId, deleteContactUs);

module.exports = router;
