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

    // ✅ Limit check
    if (imagePaths.length > 15) {
      return apiResponse.ErrorResponse(res, 'You can upload a maximum of 15 extra images');
    }

    // Check for duplicate title
    const existingProduct = await Product.findOne({
      where: { title: title.trim(), isDelete: false },
    });

    if (existingProduct) {
      return apiResponse.ErrorResponse(res, 'Product title already exists');
    }

    const product = await Product.create({
      img: mainImage,
      images: imagePaths.length > 0 ? imagePaths : null,
      title: title.trim(),
      shortDesc: shortDesc,
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
    const { title, shortDesc, existingImages } = req.body;

    const mainImage = req.files['img'] ? req.files['img'][0].path : null;
    const newImageFiles = req.files['images'] || [];
    const newImagePaths = newImageFiles.map(file => file.path);

    const product = await Product.findByPk(id);
    if (!product) return apiResponse.notFoundResponse(res, 'Product not found');

    // Check for duplicate title
    const existingProduct = await Product.findOne({
      where: { title: title.trim(), isDelete: false, id: { [Op.ne]: id } },
    });
    if (existingProduct) {
      return apiResponse.ErrorResponse(res, 'Another product with this title already exists');
    }

    // DB images
    let dbImages = [];
    if (product.images) {
      if (Array.isArray(product.images)) dbImages = product.images;
      else {
        try { dbImages = JSON.parse(product.images); } catch { dbImages = []; }
      }
    }

    // Retained images from frontend, fallback to DB
    let retainedImages = [];
    if (existingImages && existingImages.length > 0) {
      retainedImages = Array.isArray(existingImages) ? existingImages : [existingImages];
    } else {
      retainedImages = dbImages;
    }

    // Combine retained + new
    let updatedImages = [...retainedImages, ...newImagePaths];

    // Limit check
    if (updatedImages.length > 15) {
      return apiResponse.ErrorResponse(res, 'You can upload a maximum of 15 extra images');
    }

    // Save
    product.img = mainImage || product.img;
    product.images = updatedImages.length > 0 ? updatedImages : null;
    product.title = title.trim();
    product.shortDesc = shortDesc;

    await product.save();

    return apiResponse.successResponseWithData(res, 'Product updated successfully', product);

  } catch (error) {
    console.error('Update product failed', error);
    return apiResponse.ErrorResponse(res, 'Update product failed');
  }
};


// GET PRODUCTS
// GET PRODUCTS
exports.getProduct = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
    const productWithBaseUrl = products.map(product => {
      const data = product.toJSON();

      // ✅ Main image
      data.img = data.img ? baseUrl + data.img.replace(/\\/g, '/') : null;

      // ✅ Sub images (always ensure array)
      if (data.images) {
        if (typeof data.images === 'string') {
          try {
            data.images = JSON.parse(data.images);
          } catch {
            data.images = [];
          }
        }

        if (Array.isArray(data.images)) {
          data.images = data.images.map(path => {
            // Prevent double http://localhost
            if (path.startsWith('http')) {
              return path; // already full URL
            }
            return baseUrl + path.replace(/\\/g, '/');
          });
        }
      } else {
        data.images = [];
      }

      console.log("data", data);
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
