const NewsEvent = require('../models/Product');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');
const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { title, shortDesc} = req.body;
    const img = req.files['img'] ? req.files['img'][0].path : null;

    const product = await Product.create({
      img,
      title,
      shortDesc,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      'Product added successfully',
      product
    );
  } catch (error) {
    console.error('Product adding failed', error);
    return apiResponse.ErrorResponse(res, 'Add Product failed');
  }
};

exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { id } = req.params;
    const { title, shortDesc } = req.body;
    const img = req.files['img'] ? req.files['img'][0].path : null;
    

    const product = await Product.findByPk(id);
    if (!product) {
      return apiResponse.notFoundResponse(res, 'Product not found');
    }

    product.img = img || product.img;
    product.title = title;
    product.shortDesc = shortDesc;
    await product.save();

    return apiResponse.successResponseWithData(
      res,
      'Product updated successfully',
      product
    );
  } catch (error) {
    console.error('Update product failed', error);
    return apiResponse.ErrorResponse(res, 'Update product failed');
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
        const productWithBaseUrl = product.map(event => ({
      ...event.toJSON(),
      img: event.img ? baseUrl + event.img.replace(/\\/g, '/') : null,
     
    }));

    return apiResponse.successResponseWithData(
      res,
      'Product retrieved successfully',
      productWithBaseUrl
    );
  } catch (error) {
    console.error('Get product failed', error);
    return apiResponse.ErrorResponse(res, 'Get product failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return apiResponse.notFoundResponse(res, 'Product not found');
    }

   product.isActive = !product.isActive;
    await product.save();

    return apiResponse.successResponseWithData(
      res,
      'Product active status updated successfully',
      product
    );
  } catch (error) {
    console.error('Product active status failed', error);
    return apiResponse.ErrorResponse(res, 'Product active status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return apiResponse.notFoundResponse(res, 'Product not found');
    }

   product.isDelete = !product.isDelete;
    await product.save();

    return apiResponse.successResponseWithData(
      res,
      'Product delete status updated successfully',
      product
    );
  } catch (error) {
    console.error('Product delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Product delete status failed');
  }
};
