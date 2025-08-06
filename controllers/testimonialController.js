const { Op } = require("sequelize");
const Testimonial = require("../models/Testimonial");
const apiResponse = require("../helper/apiResponse");

// Add Testimonial with duplicate name check (case-sensitive)
exports.addTestimonial = async (req, res) => {
  try {
    const { name, experience, company_Name, review, star } = req.body;
    const img = req.file ? req.file.path : null;

    // Check for existing name (case-sensitive, exact match)
    const existingTestimonial = await Testimonial.findOne({
      where: {
        name: name.trim(),
        isDelete: false,
      },
    });

    if (existingTestimonial) {
      return apiResponse.validationErrorWithData(
        res,
        // "Validation Error",
        "A testimonial with this name already exists"
      );
    }

    const testimonial = await Testimonial.create({
      img,
      name,
      experience,
      company_Name,
      review,
      star,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      "Testimonial added successfully",
      testimonial
    );
  } catch (error) {
    console.error("Add testimonial failed", error);
    return apiResponse.ErrorResponse(res, "Add testimonial failed");
  }
};

// Update Testimonial with duplicate name check (case-sensitive)
exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { review, star, name, experience, company_Name } = req.body;
    const img = req.file ? req.file.path : null;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return apiResponse.notFoundResponse(res, "Testimonial not found");
    }

    // Check for duplicate name excluding current testimonial
    const existing = await Testimonial.findOne({
      where: {
        name: name.trim(),
        isDelete: false,
        id: { [Op.ne]: id },
      },
    });

    if (existing) {
      return apiResponse.validationErrorWithData(
        res,
        "Validation Error",
        "Another testimonial with this name already exists"
      );
    }

    testimonial.img = img || testimonial.img;
    testimonial.name = name;
    testimonial.experience = experience;
    testimonial.company_Name = company_Name;
    testimonial.review = review;
    testimonial.star = star;
    await testimonial.save();

    return apiResponse.successResponseWithData(
      res,
      "Testimonial updated successfully",
      testimonial
    );
  } catch (error) {
    console.error("Update testimonial failed", error);
    return apiResponse.ErrorResponse(res, "Update testimonial failed");
  }
};

// Get All Testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { isDelete: false },
    });

    const baseUrl = `${process.env.SERVER_PATH}`;
    const testimonialsWithBaseUrl = testimonials.map((testimonial) => ({
      ...testimonial.toJSON(),
      img: testimonial.img
        ? baseUrl + testimonial.img.replace(/\\/g, "/")
        : null,
    }));

    return apiResponse.successResponseWithData(
      res,
      "Testimonials retrieved successfully",
      testimonialsWithBaseUrl
    );
  } catch (error) {
    console.error("Get testimonials failed", error);
    return apiResponse.ErrorResponse(res, "Get testimonials failed");
  }
};

// Toggle Active Status
exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return apiResponse.notFoundResponse(res, "Testimonial not found");
    }

    testimonial.isActive = !testimonial.isActive;
    await testimonial.save();

    return apiResponse.successResponseWithData(
      res,
      "Testimonial status updated successfully",
      testimonial
    );
  } catch (error) {
    console.error("Toggle testimonial status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle testimonial status failed");
  }
};

// Toggle Delete Status
exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return apiResponse.notFoundResponse(res, "Testimonial not found");
    }

    testimonial.isDelete = !testimonial.isDelete;
    await testimonial.save();

    return apiResponse.successResponseWithData(
      res,
      "Testimonial delete status updated successfully",
      testimonial
    );
  } catch (error) {
    console.error("Toggle testimonial delete status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle testimonial delete status failed"
    );
  }
};
