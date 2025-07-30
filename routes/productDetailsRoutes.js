const express = require('express');
const { upload2 } = require('../middleware/multer');
const { validateProductDetails, validateProductDetailsId } = require('../validations/productDetailsValidation');
const {
  addProduct,
  updateProduct,
  getProducts,
  toggleIsActive,
  deleteProduct
} = require('../controllers/productDetailsController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-productdetails', upload2, authenticateToken, validateProductDetails, addProduct);
router.put('/update-productdetails/:productId', upload2, authenticateToken, validateProductDetails, validateProductDetailsId, updateProduct);
router.get('/get-productdetails', getProducts);
router.put('/isactive-productdetails/:id', authenticateToken, validateProductDetailsId, toggleIsActive);
router.delete('/isdelete-productdetails/:id', authenticateToken, validateProductDetailsId, deleteProduct);
module.exports = router;