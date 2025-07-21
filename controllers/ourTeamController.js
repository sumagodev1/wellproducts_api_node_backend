const OurTeam = require("../models/OurTeam");
const { validationResult } = require('express-validator');
const apiResponse = require("../helper/apiResponse");

exports.addOurTeam = async (req, res) => {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
    }
  try {
    const { name,designation,description,empID,experience} = req.body;
    const img = req.files['img'] ? req.files['img'][0].path : null;

    const ourteam = await OurTeam.create({
      img,
      name,
      designation,
      description,
      empID,
      experience,
      isActive: true,
      isDelete: false,
    });
    return apiResponse.successResponseWithData(
      res,
      "Team data added successfully",
      ourteam
    );
  } catch (error) {
    console.error("Add team data failed", error);
    return apiResponse.ErrorResponse(res, "Add tteam data failed");
  }
};

exports.updateOurTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const {name,designation,description,empID,experience } = req.body;
    const img = req.files['img'] ? req.files['img'][0].path : null;

    const ourteam = await OurTeam.findByPk(id);
    if (!ourteam) {
      return apiResponse.notFoundResponse(res, "Team data not found");
    }

    ourteam.img = img || ourteam.img;
    ourteam.name = name;
    ourteam.designation = designation;
    ourteam.description = description;
    ourteam.empID = empID;
    ourteam.experience = experience;

    await ourteam.save();

    return apiResponse.successResponseWithData(
      res,
      "Team data updated successfully",
      ourteam
    );
  } catch (error) {
    console.error("Update team data failed", error);
    return apiResponse.ErrorResponse(res, "Update team data failed");
  }
};

// exports.getOurTeam = async (req, res) => {
//   try {
//     const ourteam = await OurTeam.findAll({
//       where: { isDelete: false },
//     });

//     // Base URL for images
//     const baseUrl = `${process.env.SERVER_PATH}`;
//         console.log("baseUrl....", baseUrl);
//     const ourteamWithBaseUrl = ourteam.map((ourteam) => {
//       console.log("team.img", team.img);
//       return {
//         ...ourteam.toJSON(), // Convert Sequelize instance to plain object
//         img: ourteam.img
//           ? baseUrl + ourteam.img.replace(/\\/g, "/")
//           : null,
//       };
//     });

//     return apiResponse.successResponseWithData(
//       res,
//       "Team data retrieved successfully",
//       ourteamWithBaseUrl
//     );
//   } catch (error) {
//     console.error("Get team data failed", error);
//     return apiResponse.ErrorResponse(res, "Get team data failed");
//   }
// };

exports.getOurTeam = async (req, res) => {
  try {
    const ourteam = await OurTeam.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
    const ourteamWithBaseUrl = ourteam.map(event => {
      return {
        ...event.toJSON(),
        img: event.img ? baseUrl + event.img.replace(/\\/g, '/') : null,
      };
    });

    return apiResponse.successResponseWithData(res, 'Team information retrieved successfully', ourteamWithBaseUrl);
  } catch (error) {
    console.error('Get team information failed', error);
    return apiResponse.ErrorResponse(res, 'Get team information failed');
  }
};


exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const ourteam = await OurTeam.findByPk(id);

    if (!ourteam) {
      return apiResponse.notFoundResponse(res, "Team data not found");
    }

    ourteam.isActive = !ourteam.isActive;
    await ourteam.save();

    return apiResponse.successResponseWithData(
      res,
      "Team data status updated successfully",
      ourteam
    );
  } catch (error) {
    console.error("Team data status failed", error);
    return apiResponse.ErrorResponse(res, "Team data status failed");
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const ourteam = await OurTeam.findByPk(id);

    if (!ourteam) {
      return apiResponse.notFoundResponse(res, "Team data not found");
    }

    ourteam.isDelete = !ourteam.isDelete;
    await ourteam.save();

    return apiResponse.successResponseWithData(
      res,
      "Team data delete status updated successfully",
      ourteam
    );
  } catch (error) {
    console.error("Team data delete status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Team data delete status failed"
    );
  }
};
