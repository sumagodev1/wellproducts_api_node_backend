const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductName = sequelize.define('productname', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = ProductName;
