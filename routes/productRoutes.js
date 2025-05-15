const express = require('express');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const {
  addProduct,
  updateProduct,
  getProduct,
  isActiveStatus,
  isDeleteStatus,
} = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');
const {
  validateProduct,
  validateProductId,
} = require('../validations/productValidation');

const router = express.Router();

router.post('/create-product', uploadFiles, authenticateToken, validateProduct, addProduct);
router.put('/update-product/:id', uploadFiles, authenticateToken, validateProduct, validateProductId, updateProduct);
router.get('/get-product', getProduct);
router.put('/isactive-product/:id', authenticateToken, validateProductId, isActiveStatus);
router.delete('/isdelete-product/:id', authenticateToken, validateProductId, isDeleteStatus);

module.exports = router;
