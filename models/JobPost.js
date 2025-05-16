const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobPost = sequelize.define('jobpost', {
  jobtitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  education: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true, // Unique constraint
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true, // Unique constraint
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = JobPost;
