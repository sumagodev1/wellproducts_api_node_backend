// const HomePageBanner = require("../models/HomePageBanner");
// const apiResponse = require("../helper/apiResponse");
// const { validationResult } = require("express-validator");

// exports.addHomePageBanner = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return apiResponse.ErrorResponse(
//       res,
//       errors.array().map((err) => err.msg).join(", ")
//     );
//   }
//   try {
//     const img = req.files?.img ? req.files["img"][0].path : null;

//     const homepagebanner = await HomePageBanner.create({
//       img,
//       isActive: true,
//       isDelete: false,
//     });

//     return apiResponse.successResponseWithData(
//       res,
//       "Banner added successfully",
//       homepagebanner
//     );
//   } catch (error) {
//     console.error("Adding Banner failed", error.message);
//     return apiResponse.ErrorResponse(res, "Adding Banner failed");
//   }
// };

// exports.updateHomePageBanner = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return apiResponse.ErrorResponse(
//       res,
//       errors.array().map((err) => err.msg).join(", ")
//     );
//   }

//   try {
//     const { id } = req.params;
//     const img = req.files?.img ? req.files["img"][0].path : null;

//     const homepagebanner = await HomePageBanner.findByPk(id);
//     if (!homepagebanner) {
//       return apiResponse.notFoundResponse(res, "Banner not found");
//     }

//     homepagebanner.img = img || homepagebanner.img; // fallback to the existing image if none is provided
//     await homepagebanner.save();

//     return apiResponse.successResponseWithData(
//       res,
//       "Banner updated successfully",
//       homepagebanner
//     );
//   } catch (error) {
//     console.error("Update banner failed", error.message);
//     return apiResponse.ErrorResponse(res, "Update banner failed");
//   }
// };

// exports.getHomePageBanner = async (req, res) => {
//   try {
//     const homepagebanner = await HomePageBanner.findAll({
//       where: { isDelete: false },
//     });

//     const baseUrl = `${process.env.SERVER_PATH}`;

//     const homepagebannerWithBaseUrl = homepagebanner.map((banner) => ({
//       ...banner.toJSON(),
//       img: banner.img ? baseUrl + banner.img.replace(/\\/g, "/") : null,
//     }));

//     return apiResponse.successResponseWithData(
//       res,
//       "Banner data retrieved successfully",
//       homepagebannerWithBaseUrl
//     );
//   } catch (error) {
//     console.error("Get banner data failed", error.message);
//     return apiResponse.ErrorResponse(res, "Get banner data failed");
//   }
// };

// exports.isActiveStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const homepagebanner = await HomePageBanner.findByPk(id);

//     if (!homepagebanner) {
//       return apiResponse.notFoundResponse(res, "Banner data not found");
//     }

//     homepagebanner.isActive = !homepagebanner.isActive;
//     await homepagebanner.save();

//     return apiResponse.successResponseWithData(
//       res,
//       "Banner active status updated successfully",
//       homepagebanner // <- Corrected this from 'facilities'
//     );
//   } catch (error) {
//     console.error("Banner detail active status failed", error.message);
//     return apiResponse.ErrorResponse(
//       res,
//       "Banner detail active status failed"
//     );
//   }
// };

// exports.isDeleteStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const homepagebanner = await HomePageBanner.findByPk(id);

//     if (!homepagebanner) {
//       return apiResponse.notFoundResponse(res, "Banner detail not found");
//     }

//     homepagebanner.isDelete = !homepagebanner.isDelete;
//     await homepagebanner.save();

//     return apiResponse.successResponseWithData(
//       res,
//       "Banner detail delete status updated successfully",
//       homepagebanner
//     );
//   } catch (error) {
//     console.error("Banner detail delete status failed", error.message);
//     return apiResponse.ErrorResponse(
//       res,
//       "Banner detail delete status failed"
//     );
//   }
// };


const HomePageBanner = require("../models/HomePageBanner");
const apiResponse = require("../helper/apiResponse");
const { validationResult } = require("express-validator");
const path = require("path");

// const BASE_URL = process.env.SERVER_PATH || "http://localhost:5000";

exports.addHomePageBanner = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(
      res,
      errors.array().map((err) => err.msg).join(", ")
    );
  }
  try {
    const img = req.file ? `/uploads/banner/${req.file.filename}` : null;

    const homepagebanner = await HomePageBanner.create({
      img,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      "Banner added successfully",
      homepagebanner
    );
  } catch (error) {
    console.error("Adding Banner failed", error.message);
    return apiResponse.ErrorResponse(res, "Adding Banner failed");
  }
};


exports.updateHomePageBanner = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(
      res,
      errors.array().map((err) => err.msg).join(", ")
    );
  }

  try {
    const { id } = req.params;
    const img = req.file ? `/uploads/banner/${req.file.filename}` : null;

    const homepagebanner = await HomePageBanner.findByPk(id);
    if (!homepagebanner) {
      return apiResponse.notFoundResponse(res, "Banner not found");
    }

    homepagebanner.img = img || homepagebanner.img;
    await homepagebanner.save();

    return apiResponse.successResponseWithData(
      res,
      "Banner updated successfully",
      homepagebanner
    );
  } catch (error) {
    console.error("Update banner failed", error.message);
    return apiResponse.ErrorResponse(res, "Update banner failed");
  }
};

exports.getHomePageBanner = async (req, res) => {
  try {
    const homepagebanner = await HomePageBanner.findAll({
      where: { isDelete: false },
    });

    const BASE_URL = process.env.BASE_URL || "http://localhost:8000"; // <-- Make sure to set BASE_URL
    const homepagebannerWithBaseUrl = homepagebanner.map((banner) => ({
      ...banner.toJSON(),
      img: banner.img ? `${BASE_URL}${banner.img}` : null,
    }));


    return apiResponse.successResponseWithData(
      res,
      "Banner data retrieved successfully",
      homepagebannerWithBaseUrl
    );
  } catch (error) {
    console.error("Get banner data failed", error.message);
    return apiResponse.ErrorResponse(res, "Get banner data failed");
  }
};


exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const homepagebanner = await HomePageBanner.findByPk(id);

    if (!homepagebanner || homepagebanner.isDelete) {
      return apiResponse.notFoundResponse(res, "Banner not found or is deleted");
    }

    homepagebanner.isActive = !homepagebanner.isActive;
    await homepagebanner.save();

    return apiResponse.successResponseWithData(
      res,
      "Banner active status updated successfully",
      homepagebanner
    );
  } catch (error) {
    console.error("Banner active status failed", error.message);
    return apiResponse.ErrorResponse(res, "Banner active status failed");
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const homepagebanner = await HomePageBanner.findByPk(id);

    if (!homepagebanner) {
      return apiResponse.notFoundResponse(res, "Banner not found");
    }

    homepagebanner.isDelete = !homepagebanner.isDelete;
    await homepagebanner.save();

    return apiResponse.successResponseWithData(
      res,
      "Banner delete status updated successfully",
      homepagebanner
    );
  } catch (error) {
    console.error("Banner delete status failed", error.message);
    return apiResponse.ErrorResponse(res, "Banner delete status failed");
  }
};
