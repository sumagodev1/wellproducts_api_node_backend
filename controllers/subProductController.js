// controllers/subProductController.js
const { validationResult } = require('express-validator');
const SubProduct = require('../models/SubProduct');
const Product = require('../models/Product');
const apiResponse = require('../helper/apiResponse');
const { Op } = require('sequelize');

exports.addSubProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { productId, title, shortDesc } = req.body;
    const img = req.files['img'] ? req.files['img'][0].path : null;
    // const rawPath = req.files?.img?.[0]?.path || null;
    // const img = rawPath ? rawPath.replace(/\\/g, '/') : null;


    const mainProduct = await Product.findByPk(productId);
    if (!mainProduct) {
      return apiResponse.notFoundResponse(res, 'Main product not found');
    }

    const subProduct = await SubProduct.create({
      productId,
      title: title.trim(),
      shortDesc: shortDesc?.trim() || '',
      img,
    });

    return apiResponse.successResponseWithData(res, 'SubProduct added successfully', subProduct);
  } catch (error) {
    console.error('Add SubProduct failed', error);
    return apiResponse.ErrorResponse(res, 'Add SubProduct failed');
  }
};

exports.getSubProductsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const subProducts = await SubProduct.findAll({
      where: { productId, isDelete: false },
    });

    const baseUrl = `${process.env.SERVER_PATH}`;
    const result = subProducts.map(sub => ({
      ...sub.toJSON(),
      img: sub.img ? baseUrl + sub.img.replace(/\\/g, '/') : null,
    }));

    return apiResponse.successResponseWithData(res, 'SubProducts retrieved', result);
  } catch (error) {
    console.error('Get subproducts failed', error);
    return apiResponse.ErrorResponse(res, 'Get subproducts failed');
  }
};

exports.updateSubProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { id } = req.params;
    const { title, shortDesc } = req.body;
    const img = req.files['img'] ? req.files['img'][0].path : null;

    // const rawPath = req.files?.img?.[0]?.path || null;
    // const img = rawPath ? rawPath.replace(/\\/g, '/') : null;


    const subProduct = await SubProduct.findByPk(id);
    if (!subProduct || subProduct.isDelete) {
      return apiResponse.notFoundResponse(res, 'SubProduct not found');
    }

    subProduct.title = title.trim();
    subProduct.shortDesc = shortDesc?.trim() || '';
    if (img) subProduct.img = img;

    await subProduct.save();

    return apiResponse.successResponseWithData(res, 'SubProduct updated', subProduct);
  } catch (error) {
    console.error('Update SubProduct failed', error);
    return apiResponse.ErrorResponse(res, 'Update SubProduct failed');
  }
};

exports.toggleSubProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const subProduct = await SubProduct.findByPk(id);

    if (!subProduct) {
      return apiResponse.notFoundResponse(res, 'SubProduct not found');
    }

    subProduct.isActive = !subProduct.isActive;
    await subProduct.save();

    return apiResponse.successResponseWithData(res, 'SubProduct status toggled', subProduct);
  } catch (error) {
    console.error('Toggle status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle status failed');
  }
};

exports.deleteSubProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const subProduct = await SubProduct.findByPk(id);

    if (!subProduct) {
      return apiResponse.notFoundResponse(res, 'SubProduct not found');
    }

    subProduct.isDelete = true;
    await subProduct.save();

    return apiResponse.successResponseWithData(res, 'SubProduct deleted', subProduct);
  } catch (error) {
    console.error('Delete SubProduct failed', error);
    return apiResponse.ErrorResponse(res, 'Delete SubProduct failed');
  }
};
