const ContactUs = require('../models/ContactUs');
const apiResponse = require('../helper/apiResponse');

exports.addContactUs = async (req, res) => {
  try {
    const { name, email, message, phone,subject } = req.body;

    const contactus = await ContactUs.create({ name, email, message, phone,subject });
    return apiResponse.successResponseWithData(res, 'Contact Us data added successfully', contactus);
  } catch (error) {
    console.error('Add Contact us data failed', error);
    return apiResponse.ErrorResponse(res, 'Add Contact us data failed');
  }
};

exports.getContactUs = async (req, res) => {
  try {
    const contactus = await ContactUs.findAll({ where: { isDelete: false } });
    return apiResponse.successResponseWithData(res, 'Contact Us records retrieved successfully', contactus);
  } catch (error) {
    console.error('Get Contact us records failed', error);
    return apiResponse.ErrorResponse(res, 'Get Contact us records failed');
  }
};

exports.updateContactUs = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message, phone,subject } = req.body;

    const contactus = await ContactUs.findByPk(id);
    if (!contactus) {
      return apiResponse.notFoundResponse(res, 'Contact us record not found');
    }

    contactus.name = name;
    contactus.email = email;
    contactus.message = message;
    contactus.phone = phone;
    contactus.subject = subject;
    await contactus.save();

    return apiResponse.successResponseWithData(res, 'Contact us record updated successfully', contactus);
  } catch (error) {
    console.error('Update Contact Us record failed', error);
    return apiResponse.ErrorResponse(res, 'Update Contact us record failed');
  }
};


exports.deleteContactUs = async (req, res) => {
  try {
    const { id } = req.params;
    const contactus = await ContactUs.findByPk(id);

    if (!contactus) {
      return apiResponse.notFoundResponse(res, 'Contact Us record not found');
    }

    contactus.isDeleted = true; // Changed from isDelete to isDeleted
    await contactus.save();

    return apiResponse.successResponseWithData(
      res,
      'Contact Us record deleted successfully',
      contactus
    );
  } catch (error) {
    console.error('Failed to delete Contact Us record:', error);
    return apiResponse.ErrorResponse(res, 'Failed to delete Contact Us record');
  }
};

