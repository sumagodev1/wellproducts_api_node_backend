// routes/subProductRoutes.js
const express = require('express');
const router = express.Router();
const subProductController = require('../controllers/subProductController');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');

router.post('/create-subproduct', uploadFiles, subProductController.addSubProduct);
router.get('/get-product/:productId', subProductController.getSubProductsByProduct);
router.put('/update-product/:id',uploadFiles, subProductController.updateSubProduct);
router.patch('/status-product/status/:id', subProductController.toggleSubProductStatus);
router.delete('/delete-product/:id', subProductController.deleteSubProduct);

module.exports = router;
