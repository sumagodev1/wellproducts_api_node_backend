const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('userform', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true, // Make email field unique
    validate: {
      isEmail: true,
    },
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true, // Make mobile field unique
  },
  message: {
    type: DataTypes.TEXT,
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

module.exports = Contact;
