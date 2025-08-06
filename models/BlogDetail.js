// models/BlogDetail.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BlogDetail = sequelize.define('blogs', {
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
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
  publishedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

module.exports = BlogDetail;
