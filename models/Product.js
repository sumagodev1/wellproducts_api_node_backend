const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const SubProduct = require('../models/SubProduct');


const Product = sequelize.define('product', {
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
   images: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  shortDesc: {
    type: DataTypes.TEXT,
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

module.exports = Product;


