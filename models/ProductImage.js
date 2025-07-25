const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductImage = sequelize.define('productimage', {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProductDetailId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = ProductImage;
