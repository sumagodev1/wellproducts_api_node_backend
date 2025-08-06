const { Op } = require("sequelize");
const NewsEvent = require("../models/News");
const apiResponse = require("../helper/apiResponse");

// ✅ Create News with duplicate titleLine1 check
exports.addNewsEvent = async (req, res) => {
  try {
    const { titleLine1, titleLine2, publishedDate } = req.body;
    const img = req.file ? req.file.path : null;

    // Check for existing titleLine1 (case-sensitive)
    const existingNews = await NewsEvent.findOne({
      where: {
        titleLine1: titleLine1.trim(),
        isDelete: false,
      },
    });

    if (existingNews) {
      return apiResponse.validationErrorWithData(
        res,
        "A news item with this titleLine1 already exists"
      );
    }

    const news = await NewsEvent.create({
      img,
      titleLine1,
      titleLine2,
      publishedDate,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(res, "News created successfully", news);
  } catch (error) {
    console.error("Add news failed", error);
    return apiResponse.ErrorResponse(res, "Add news failed");
  }
};

// ✅ Update News with duplicate titleLine1 check
exports.updateNewsEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { titleLine1, titleLine2, publishedDate } = req.body;
    const img = req.file ? req.file.path : null;

    const news = await NewsEvent.findByPk(id);
    if (!news) {
      return apiResponse.notFoundResponse(res, "News not found");
    }

    // Check for duplicate titleLine1 excluding current news
    const existing = await NewsEvent.findOne({
      where: {
        titleLine1: titleLine1.trim(),
        isDelete: false,
        id: { [Op.ne]: id },
      },
    });

    if (existing) {
      return apiResponse.validationErrorWithData(
        res,
        "Another news item with this titleLine1 already exists"
      );
    }

    news.img = img || news.img;
    news.titleLine1 = titleLine1;
    news.titleLine2 = titleLine2;
    news.publishedDate = publishedDate;
    await news.save();

    return apiResponse.successResponseWithData(res, "News updated successfully", news);
  } catch (error) {
    console.error("Update news failed", error);
    return apiResponse.ErrorResponse(res, "Update news failed");
  }
};

// ✅ Get All News
exports.getNewsEvents = async (req, res) => {
  try {
    const newsList = await NewsEvent.findAll({
      where: { isDelete: false },
      order: [["publishedDate", "DESC"]],
    });

    const baseUrl = process.env.SERVER_PATH || "";

    const formatted = newsList.map((news) => ({
      ...news.toJSON(),
      img: news.img ? baseUrl + news.img.replace(/\\/g, "/") : null,
      publishedDate: new Date(news.publishedDate).toLocaleDateString("en-IN"),
    }));

    return apiResponse.successResponseWithData(res, "News list fetched successfully", formatted);
  } catch (error) {
    console.error("Fetch news failed", error);
    return apiResponse.ErrorResponse(res, "Fetch news failed");
  }
};

// ✅ Toggle Active Status
exports.toggleActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await NewsEvent.findByPk(id);

    if (!news) {
      return apiResponse.notFoundResponse(res, "News not found");
    }

    news.isActive = !news.isActive;
    await news.save();

    return apiResponse.successResponseWithData(res, "News active status updated", news);
  } catch (error) {
    console.error("Toggle active status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle active status failed");
  }
};

// ✅ Toggle Delete Status
exports.toggleDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await NewsEvent.findByPk(id);

    if (!news) {
      return apiResponse.notFoundResponse(res, "News not found");
    }

    news.isDelete = !news.isDelete;
    await news.save();

    return apiResponse.successResponseWithData(res, "News delete status updated", news);
  } catch (error) {
    console.error("Toggle delete failed", error);
    return apiResponse.ErrorResponse(res, "Toggle delete failed");
  }
};
