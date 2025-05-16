const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SocialMedia = sequelize.define('socialmedia', {
  medialinks: {
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

module.exports = SocialMedia;
