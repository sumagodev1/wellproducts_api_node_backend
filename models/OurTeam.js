const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OurTeam = sequelize.define('ourteam', {
    img: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    empID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    experience: {
        type: DataTypes.INTEGER,
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

module.exports = OurTeam;