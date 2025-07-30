// const { Op } = require('sequelize');
// const Product = require('../models/Product');
// const apiResponse = require('../helper/apiResponse');
// const { validationResult } = require('express-validator');

// exports.addProduct = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
//   }

//   try {
//     const { title, shortDesc } = req.body;
//     const img = req.files['img'] ? req.files['img'][0].path : null;

//     // Check for duplicate title
//     const existingProduct = await Product.findOne({
//       where: {
//         title: title.trim(),
//         isDelete: false,
//       },
//     });

//     if (existingProduct) {
//       return apiResponse.ErrorResponse(res, 'Product title already exists');
//     }

//     const product = await Product.create({
//       img,
//       title: title.trim(),
//       shortDesc: shortDesc.trim(),
//       isActive: true,
//       isDelete: false,
//     });

//     return apiResponse.successResponseWithData(
//       res,
//       'Product added successfully',
//       product
//     );
//   } catch (error) {
//     console.error('Product adding failed', error);
//     return apiResponse.ErrorResponse(res, 'Add Product failed');
//   }
// };

// exports.updateProduct = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
//   }

//   try {
//     const { id } = req.params;
//     const { title, shortDesc } = req.body;
//     const img = req.files['img'] ? req.files['img'][0].path : null;

//     const product = await Product.findByPk(id);
//     if (!product) {
//       return apiResponse.notFoundResponse(res, 'Product not found');
//     }

//     // Check for duplicate title in other products
//     const existingProduct = await Product.findOne({
//       where: {
//         title: title.trim(),
//         isDelete: false,
//         id: { [Op.ne]: id },
//       },
//     });

//     if (existingProduct) {
//       return apiResponse.ErrorResponse(res, 'Another product with this title already exists');
//     }

//     product.img = img || product.img;
//     product.title = title.trim();
//     product.shortDesc = shortDesc.trim();
//     await product.save();

//     return apiResponse.successResponseWithData(
//       res,
//       'Product updated successfully',
//       product
//     );
//   } catch (error) {
//     console.error('Update product failed', error);
//     return apiResponse.ErrorResponse(res, 'Update product failed');
//   }
// };

// exports.getProduct = async (req, res) => {
//   try {
//     const product = await Product.findAll({ where: { isDelete: false } });

//     const baseUrl = `${process.env.SERVER_PATH}`;
//     const productWithBaseUrl = product.map(event => ({
//       ...event.toJSON(),
//       img: event.img ? baseUrl + event.img.replace(/\\/g, '/') : null,
//     }));

//     return apiResponse.successResponseWithData(
//       res,
//       'Product retrieved successfully',
//       productWithBaseUrl
//     );
//   } catch (error) {
//     console.error('Get product failed', error);
//     return apiResponse.ErrorResponse(res, 'Get product failed');
//   }
// };

// exports.isActiveStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByPk(id);

//     if (!product) {
//       return apiResponse.notFoundResponse(res, 'Product not found');
//     }

//     product.isActive = !product.isActive;
//     await product.save();

//     return apiResponse.successResponseWithData(
//       res,
//       'Product active status updated successfully',
//       product
//     );
//   } catch (error) {
//     console.error('Product active status failed', error);
//     return apiResponse.ErrorResponse(res, 'Product active status failed');
//   }
// };

// exports.isDeleteStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByPk(id);

//     if (!product) {
//       return apiResponse.notFoundResponse(res, 'Product not found');
//     }

//     product.isDelete = !product.isDelete;
//     await product.save();

//     return apiResponse.successResponseWithData(
//       res,
//       'Product delete status updated successfully',
//       product
//     );
//   } catch (error) {
//     console.error('Product delete status failed', error);
//     return apiResponse.ErrorResponse(res, 'Product delete status failed');
//   }
// };


const { Op } = require('sequelize');
const Product = require('../models/Product');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

// ADD PRODUCT
exports.addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { title, shortDesc } = req.body;

    const mainImage = req.files['img'] ? req.files['img'][0].path : null;
    const extraImages = req.files['images'] || [];
    const imagePaths = extraImages.map(file => file.path);

    // Check for duplicate title
    const existingProduct = await Product.findOne({
      where: {
        title: title.trim(),
        isDelete: false,
      },
    });

    if (existingProduct) {
      return apiResponse.ErrorResponse(res, 'Product title already exists');
    }

    const product = await Product.create({
      img: mainImage,
      images: imagePaths.length > 0 ? imagePaths : null,
      title: title.trim(),
      shortDesc: shortDesc.trim(),
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

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { id } = req.params;
    const { title, shortDesc } = req.body;

    const mainImage = req.files['img'] ? req.files['img'][0].path : null;
    const extraImages = req.files['images'] || [];
    const imagePaths = extraImages.map(file => file.path);

    const product = await Product.findByPk(id);
    if (!product) {
      return apiResponse.notFoundResponse(res, 'Product not found');
    }

    // Check for duplicate title in other products
    const existingProduct = await Product.findOne({
      where: {
        title: title.trim(),
        isDelete: false,
        id: { [Op.ne]: id },
      },
    });

    if (existingProduct) {
      return apiResponse.ErrorResponse(res, 'Another product with this title already exists');
    }

    product.img = mainImage || product.img;
    product.images = imagePaths.length > 0 ? imagePaths : product.images;
    product.title = title.trim();
    product.shortDesc = shortDesc.trim();

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

// GET PRODUCTS
exports.getProduct = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
    const productWithBaseUrl = products.map(product => {
      const data = product.toJSON();
      data.img = data.img ? baseUrl + data.img.replace(/\\/g, '/') : null;
      data.images = Array.isArray(data.images)
        ? data.images.map(path => baseUrl + path.replace(/\\/g, '/'))
        : null;
      return data;
    });

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

// TOGGLE ACTIVE STATUS
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

// TOGGLE DELETE STATUS
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
