const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const SubProduct = sequelize.define('subproduct', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortDesc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.JSON, // Array of image paths
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

SubProduct.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(SubProduct, { foreignKey: 'productId' });

module.exports = SubProduct;
