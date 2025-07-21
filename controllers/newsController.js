const NewsEvent = require("../models/News");
const apiResponse = require("../helper/apiResponse");

// ✅ Create News
exports.addNewsEvent = async (req, res) => {
  try {
    const { titleLine1, titleLine2, publishedDate } = req.body;
    const img = req.file ? req.file.path : null;

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

// ✅ Update News
exports.updateNewsEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { titleLine1, titleLine2, publishedDate } = req.body;
    const img = req.file ? req.file.path : null;

    const news = await NewsEvent.findByPk(id);
    if (!news) {
      return apiResponse.notFoundResponse(res, "News not found");
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
