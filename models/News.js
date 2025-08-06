// models/NewsEvent.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NewsEvent = sequelize.define('dailynews', {
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  titleLine1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titleLine2: {
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

module.exports = NewsEvent;
