const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HomePageBanner = sequelize.define('homepagebanner', {
  img: {
    type: DataTypes.STRING,
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

module.exports = HomePageBanner;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const HomePageBanner = sequelize.define(
//   'HomePageBanner',
//   {
//     img: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         isUrl: {
//           msg: "Image must be a valid URL",
//         },
//       },
//     },
//     isActive: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//     isDelete: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },
//   {
//     timestamps: true,
//     paranoid: true,
//     underscored: true,
//     tableName: 'HomePageBanner',
//   }
// );

// module.exports = HomePageBanner;
