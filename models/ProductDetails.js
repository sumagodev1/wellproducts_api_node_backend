const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ProductImages = require('./ProductImage');

const ProductDetails = sequelize.define('productdetails', {
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  specs: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

ProductDetails.hasMany(ProductImages, { as: 'images', foreignKey: 'ProductDetailId' });
ProductImages.belongsTo(ProductDetails, { foreignKey: 'ProductDetailId' });

module.exports = ProductDetails;