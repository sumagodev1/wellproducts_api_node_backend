// controllers/blogDetailController.js
const BlogDetail = require("../models/BlogDetail");
const apiResponse = require("../helper/apiResponse");

exports.addBlogDetail = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const img = req.file ? req.file.path : null;

    const blogDetail = await BlogDetail.create({
      img,
      title,
      subtitle,
      isActive: true,
      isDelete: false,
      publishedDate: new Date(),
    });

    return apiResponse.successResponseWithData(
      res,
      "Blog details added successfully",
      blogDetail
    );
  } catch (error) {
    console.error("Add blog details failed", error);
    return apiResponse.ErrorResponse(res, "Add blog details failed");
  }
};

exports.updateBlogDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle } = req.body;
    const img = req.file ? req.file.path : null;

    const blogDetail = await BlogDetail.findByPk(id);
    if (!blogDetail) {
      return apiResponse.notFoundResponse(res, "Blog detail not found");
    }

    blogDetail.img = img || blogDetail.img;
    blogDetail.title = title;
    blogDetail.subtitle = subtitle;
    await blogDetail.save();

    return apiResponse.successResponseWithData(
      res,
      "Blog details updated successfully",
      blogDetail
    );
  } catch (error) {
    console.error("Update blog details failed", error);
    return apiResponse.ErrorResponse(res, "Update blog details failed");
  }
};

exports.getBlogDetails = async (req, res) => {
  try {
    const blogDetails = await BlogDetail.findAll({
      where: { isDelete: false },
      order: [['publishedDate', 'DESC']],
    });

    const baseUrl = process.env.SERVER_PATH;

    const blogDetailsWithBaseUrl = blogDetails.map((blogDetail) => ({
      ...blogDetail.toJSON(),
      img: blogDetail.img ? baseUrl + blogDetail.img.replace(/\\/g, "/") : null,
      publishedDate: new Date(blogDetail.publishedDate).toLocaleDateString('en-IN'),
    }));

    return apiResponse.successResponseWithData(
      res,
      "Blog details retrieved successfully",
      blogDetailsWithBaseUrl
    );
  } catch (error) {
    console.error("Get blog details failed", error);
    return apiResponse.ErrorResponse(res, "Get blog details failed");
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const blogDetail = await BlogDetail.findByPk(id);

    if (!blogDetail) {
      return apiResponse.notFoundResponse(res, "Blog detail not found");
    }

    blogDetail.isActive = !blogDetail.isActive;
    await blogDetail.save();

    return apiResponse.successResponseWithData(
      res,
      "Blog detail active status updated successfully",
      blogDetail
    );
  } catch (error) {
    console.error("Toggle blog detail active status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle blog detail active status failed");
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const blogDetail = await BlogDetail.findByPk(id);

    if (!blogDetail) {
      return apiResponse.notFoundResponse(res, "Blog detail not found");
    }

    blogDetail.isDelete = !blogDetail.isDelete;
    await blogDetail.save();

    return apiResponse.successResponseWithData(
      res,
      "Blog detail delete status updated successfully",
      blogDetail
    );
  } catch (error) {
    console.error("Toggle blog detail delete status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle blog detail delete status failed");
  }
};
