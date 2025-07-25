const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('userdb', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  
  timestamps: false
});
module.exports = User;
