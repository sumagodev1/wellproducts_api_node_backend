// models/SubProduct.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const SubProduct = sequelize.define('subproduct', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shortDesc: {
    type: DataTypes.STRING,
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
});

// Relation: One Product has many SubProducts
Product.hasMany(SubProduct, { foreignKey: 'productId', onDelete: 'CASCADE' });
SubProduct.belongsTo(Product, { foreignKey: 'productId' });

module.exports = SubProduct;
