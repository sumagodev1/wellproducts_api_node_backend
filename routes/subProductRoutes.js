const express = require('express');

const {
  addSubProduct,
  getSubProductsByProduct,
  updateSubProduct,
  deleteSubProduct,
  toggleActiveStatus,
} = require('../controllers/subProductController');

const authenticateToken = require('../middleware/auth');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');

const router = express.Router();

router.post('/create', authenticateToken, uploadFiles, addSubProduct);
router.get('/by-product/:productId', authenticateToken, getSubProductsByProduct);
router.put('/update/:id', authenticateToken, uploadFiles, updateSubProduct);
router.delete('/delete/:id', authenticateToken, deleteSubProduct);
router.put('/toggle-active/:id', authenticateToken, toggleActiveStatus);

module.exports = router;
