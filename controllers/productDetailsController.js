const ProductDetails = require('../models/ProductDetails');
const ProductImage = require('../models/ProductImage');

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { productName, description, specs, images } = req.body;

    const newProduct = await ProductDetails.create({
      productName,
      description,
      specs,
      img: images[0], // default/cover image
    });

    if (images && images.length > 0) {
      const imageData = images.map((url) => ({
        imageUrl: url,
        ProductDetailId: newProduct.id,
      }));
      await ProductImage.bulkCreate(imageData);
    }

    return res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await ProductDetails.findAll({
      where: { isDelete: false },
      include: [
        { model: ProductImage, as: 'images', attributes: ['id', 'imageUrl'] }
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, specs, images } = req.body;

    const product = await ProductDetails.findByPk(id);
    if (!product || product.isDelete) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.update({
      productName,
      description,
      specs,
      img: images[0] || product.img,
    });

    await ProductImage.destroy({ where: { ProductDetailId: id } });

    if (images && images.length > 0) {
      const imageData = images.map((url) => ({
        imageUrl: url,
        ProductDetailId: id,
      }));
      await ProductImage.bulkCreate(imageData);
    }

    res.status(200).json({ success: true, message: 'Product updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Soft Delete
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductDetails.findByPk(id);
    if (!product || product.isDelete) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.update({ isDelete: true });

    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Toggle isActive
exports.toggleIsActive = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductDetails.findByPk(id);
    if (!product || product.isDelete) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.update({ isActive: !product.isActive });

    res.status(200).json({ success: true, isActive: product.isActive });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};