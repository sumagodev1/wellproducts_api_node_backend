const ContactInformation = require('../models/ContactInformation');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

exports.addContactInformation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }
  try {
    const { phone, email, address } = req.body;


    const contactinformation = await ContactInformation.create({ 
      phone, email, address, 
      isActive: true, isDelete: false 
    });
    return apiResponse.successResponseWithData(res, 'Contact information added successfully', contactinformation);
  } catch (error) {
    console.error('Add contact information failed', error);
    return apiResponse.ErrorResponse(res, 'Add contact information failed');
  }
};

exports.updateContactInformation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }
  try {
    const { id } = req.params;
    const { phone, email, address } = req.body;

    const contactinformation = await ContactInformation.findByPk(id);
    if (!contactinformation) {
      return apiResponse.notFoundResponse(res, 'Contact information not found');
    }

    contactinformation.phone = phone;
    contactinformation.email = email;
    contactinformation.address = address;
    await contactinformation.save();

    return apiResponse.successResponseWithData(res, 'Contact information updated successfully', contactinformation);
  } catch (error) {
    console.error('Update contact information failed', error);
    return apiResponse.ErrorResponse(res, 'Update contact information failed');
  }
};

exports.getContactInformation = async (req, res) => {
  try {
    const contactinformation = await ContactInformation.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
    const contactinformationWithBaseUrl = contactinformation.map(event => {
      return {
        ...event.toJSON(),
      };
    });

    return apiResponse.successResponseWithData(res, 'Contact information retrieved successfully', contactinformationWithBaseUrl);
  } catch (error) {
    console.error('Get contact information failed', error);
    return apiResponse.ErrorResponse(res, 'Get contact information failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const contactinformation = await ContactInformation.findByPk(id);

    if (!contactinformation) {
      return apiResponse.notFoundResponse(res, 'Contact information not found');
    }

    contactinformation.isActive = !contactinformation.isActive;
    await contactinformation.save();

    return apiResponse.successResponseWithData(res, 'Contact information status updated successfully', contactinformation);
  } catch (error) {
    console.error('Toggle contact information status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle contact information status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const contactinformation = await ContactInformation.findByPk(id);

    if (!contactinformation) {
      return apiResponse.notFoundResponse(res, 'Contact information not found');
    }

    contactinformation.isDelete = !contactinformation.isDelete;
    await contactinformation.save();

    return apiResponse.successResponseWithData(res, 'Contact information delete status updated successfully', contactinformation);
  } catch (error) {
    console.error('Toggle contact information delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle contact information delete status failed');
  }
};
