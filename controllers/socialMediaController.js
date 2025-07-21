const SocialMedia = require('../models/SocialMedia');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

exports.addSocialMedia = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { medialinks} = req.body;

    const socialmedia = await SocialMedia.create({
      medialinks,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      'Media Link added successfully',
      socialmedia
    );
  } catch (error) {
    console.error('Add media link failed', error);
    return apiResponse.ErrorResponse(res, 'Add media link failed');
  }
};

exports.updateSocialMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const { medialinks } = req.body;
    // const img = req.file ? req.file.path : null;


    const socialmedia = await SocialMedia.findByPk(id);
    if (!socialmedia) {
      return apiResponse.notFoundResponse(res, "Media link not found");
    }


    socialmedia.medialinks = medialinks;
    await socialmedia.save();

    return apiResponse.successResponseWithData(
      res,
      "Media Link updated successfully",
      socialmedia
    );
  } catch (error) {
    console.error("Update media link failed", error);
    return apiResponse.ErrorResponse(res, "Update blog details failed");
  }
};


exports.getSocialMedia = async (req, res) => {
  try {
    const socialmedia = await SocialMedia.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
        const socialmediaWithBaseUrl = socialmedia.map(event => ({
      ...event.toJSON(),
    }));

    return apiResponse.successResponseWithData(
      res,
      'Social media links retrieved successfully',
      socialmediaWithBaseUrl
    );
  } catch (error) {
    console.error('Get social media link events failed', error);
    return apiResponse.ErrorResponse(res, 'Get social media link failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const socialmedia = await SocialMedia.findByPk(id);

    if (!socialmedia) {
      return apiResponse.notFoundResponse(res, 'Social media link not found');
    }

    socialmedia.isActive = !socialmedia.isActive;
    await socialmedia.save();

    return apiResponse.successResponseWithData(
      res,
      'Social media link status updated successfully',
      socialmedia
    );
  } catch (error) {
    console.error('Toggle social media link active status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle social media link active status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const socialmedia = await SocialMedia.findByPk(id);

    if (!socialmedia) {
      return apiResponse.notFoundResponse(res, 'Social Media link not found');
    }

    socialmedia.isDelete = !socialmedia.isDelete;
    await socialmedia.save();

    return apiResponse.successResponseWithData(
      res,
      'Social media link delete status updated successfully',
      socialmedia
    );
  } catch (error) {
    console.error('Toggle social media link delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle social media link delete status failed');
  }
};
