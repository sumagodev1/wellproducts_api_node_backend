// models/Client.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Client = sequelize.define('client',{
    img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clientName: {
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
  timestamps: true, // Adds createdAt and updatedAt
});

module.exports = Client;