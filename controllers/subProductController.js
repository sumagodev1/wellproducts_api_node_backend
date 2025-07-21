const { validationResult } = require('express-validator');
const SubProduct = require('../models/SubProduct');
const Product = require('../models/Product');
const apiResponse = require('../helper/apiResponse');
const { Op } = require('sequelize');

// CREATE
exports.addSubProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { title, shortDesc, productId } = req.body;

    const product = await Product.findByPk(productId);
    if (!product || product.isDelete) {
      return apiResponse.notFoundResponse(res, 'Main product not found');
    }

    const imageFiles = req.files['img'] || [];
    const imagePaths = imageFiles.map(file => file.path);

    const subProduct = await SubProduct.create({
      title: title.trim(),
      shortDesc: shortDesc.trim(),
      img: imagePaths,
      productId,
    });

    return apiResponse.successResponseWithData(res, 'Sub-product created successfully', subProduct);
  } catch (error) {
    console.error('Add SubProduct Error:', error);
    return apiResponse.ErrorResponse(res, 'Create sub-product failed');
  }
};

// READ
exports.getSubProductsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const subProducts = await SubProduct.findAll({
      where: { productId, isDelete: false },
    });

    const baseUrl = process.env.SERVER_PATH;
    const result = subProducts.map(sub => ({
      ...sub.toJSON(),
      img: sub.img?.map(img => baseUrl + img.replace(/\\/g, '/')) || [],
    }));

    return apiResponse.successResponseWithData(res, 'Sub-products retrieved', result);
  } catch (error) {
    console.error('Get SubProducts Error:', error);
    return apiResponse.ErrorResponse(res, 'Failed to get sub-products');
  }
};

// UPDATE
exports.updateSubProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, shortDesc } = req.body;

    const subProduct = await SubProduct.findByPk(id);
    if (!subProduct || subProduct.isDelete) {
      return apiResponse.notFoundResponse(res, 'Sub-product not found');
    }

    const imageFiles = req.files['img'] || [];
    const imagePaths = imageFiles.map(file => file.path);

    subProduct.title = title?.trim() || subProduct.title;
    subProduct.shortDesc = shortDesc?.trim() || subProduct.shortDesc;
    subProduct.img = imagePaths.length > 0 ? imagePaths : subProduct.img;

    await subProduct.save();

    return apiResponse.successResponseWithData(res, 'Sub-product updated', subProduct);
  } catch (error) {
    console.error('Update SubProduct Error:', error);
    return apiResponse.ErrorResponse(res, 'Update failed');
  }
};

// DELETE (Soft delete)
exports.deleteSubProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const subProduct = await SubProduct.findByPk(id);
    if (!subProduct || subProduct.isDelete) {
      return apiResponse.notFoundResponse(res, 'Sub-product not found');
    }

    subProduct.isDelete = true;
    await subProduct.save();

    return apiResponse.successResponse(res, 'Sub-product deleted successfully');
  } catch (error) {
    console.error('Delete SubProduct Error:', error);
    return apiResponse.ErrorResponse(res, 'Delete failed');
  }
};

// TOGGLE ACTIVE
exports.toggleActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const subProduct = await SubProduct.findByPk(id);
    if (!subProduct || subProduct.isDelete) {
      return apiResponse.notFoundResponse(res, 'Sub-product not found');
    }

    subProduct.isActive = !subProduct.isActive;
    await subProduct.save();

    return apiResponse.successResponseWithData(res, 'Sub-product status updated', subProduct);
  } catch (error) {
    console.error('Toggle Status Error:', error);
    return apiResponse.ErrorResponse(res, 'Toggle status failed');
  }
};
