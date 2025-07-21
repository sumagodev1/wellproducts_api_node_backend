const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProjectName = sequelize.define('project_name_master', {
  project_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project_category_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = ProjectName;
