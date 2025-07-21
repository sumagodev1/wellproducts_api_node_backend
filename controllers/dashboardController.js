// controllers/dashboardController.js

const Product = require('../models/Product');
const News = require('../models/News');
const BlogDetail = require('../models/BlogDetail');
const Facilities =require('../models/Facilities');
const JobPost = require('../models/JobPost');
const apiResponse = require('../helper/apiResponse');

exports.getDashboardStats = async (req, res) => {
  try {
    const [productCount, newsCount, blogCount,facilitiesCount,jobpostCount] = await Promise.all([
      Product.count(),
      News.count(),
      BlogDetail.count(),
      Facilities.count(),
      JobPost.count()

    ]);

    return apiResponse.successResponseWithData(res, "Dashboard stats fetched", {
      productCount,
      newsCount,
      blogCount,
      facilitiesCount,
      jobpostCount
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return apiResponse.ErrorResponse(res, "Something went wrong.");
  }
};
