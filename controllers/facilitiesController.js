const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Facilities = require('../models/Facilities');

// ✅ Add Facilities with title required + duplicate check
exports.addFacilities = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { title, shortDesc } = req.body;
    const img = req.files['img'] ? req.files['img'][0].path : null;

    // Check for duplicate title
    const existing = await Facilities.findOne({
      where: {
        title: title.trim(),
        isDelete: false,
      },
    });

    if (existing) {
      return apiResponse.validationErrorWithData(
        res,
        'A facility with this title already exists'
      );
    }

    const facilities = await Facilities.create({
      img,
      title,
      shortDesc,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      'Facilities added successfully',
      facilities
    );
  } catch (error) {
    console.error('Facilities adding failed', error);
    return apiResponse.ErrorResponse(res, 'Add facilities failed');
  }
};

// ✅ Update Facilities with title required + duplicate check (excluding current ID)
exports.updateFacilities = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { id } = req.params;
    const { title, shortDesc } = req.body;
    const img = req.files['img'] ? req.files['img'][0].path : null;

    const facilities = await Facilities.findByPk(id);
    if (!facilities) {
      return apiResponse.notFoundResponse(res, 'Facilities not found');
    }

    // Check for duplicate title excluding current
    const existing = await Facilities.findOne({
      where: {
        title: title.trim(),
        isDelete: false,
        id: { [Op.ne]: id },
      },
    });

    if (existing) {
      return apiResponse.validationErrorWithData(
        res,
        'Another facility with this title already exists'
      );
    }

    facilities.img = img || facilities.img;
    facilities.title = title;
    facilities.shortDesc = shortDesc;
    await facilities.save();

    return apiResponse.successResponseWithData(
      res,
      'Facilities updated successfully',
      facilities
    );
  } catch (error) {
    console.error('Update facilities failed', error);
    return apiResponse.ErrorResponse(res, 'Update facilities failed');
  }
};

exports.getFacilities = async (req, res) => {
  try {
    const facilities = await Facilities.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
    const facilitiesWithBaseUrl = facilities.map(event => ({
      ...event.toJSON(),
      img: event.img ? baseUrl + event.img.replace(/\\/g, '/') : null,
    }));

    return apiResponse.successResponseWithData(
      res,
      'facilities retrieved successfully',
      facilitiesWithBaseUrl
    );
  } catch (error) {
    console.error('Get facilities failed', error);
    return apiResponse.ErrorResponse(res, 'Get facilities failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const facilities = await Facilities.findByPk(id);

    if (!facilities) {
      return apiResponse.notFoundResponse(res, 'Facilities not found');
    }

    facilities.isActive = !facilities.isActive;
    await facilities.save();

    return apiResponse.successResponseWithData(
      res,
      'Facilities active status updated successfully',
      facilities
    );
  } catch (error) {
    console.error('Facilities active status failed', error);
    return apiResponse.ErrorResponse(res, 'Facilities active status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const facilities = await Facilities.findByPk(id);

    if (!facilities) {
      return apiResponse.notFoundResponse(res, 'Facilities not found');
    }

    facilities.isDelete = !facilities.isDelete;
    await facilities.save();

    return apiResponse.successResponseWithData(
      res,
      'facilities delete status updated successfully',
      facilities
    );
  } catch (error) {
    console.error('Facilities delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Facilities delete status failed');
  }
};
