const UploadCV = require("../models/UploadCV");
const apiResponse = require("../helper/apiResponse");
const nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");

// Add Upload CV
exports.addUploadCV = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(", "));
  }

  try {
    const { name, email, phone, subject, message } = req.body;
    const filePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
    const cv = filePath ? `${process.env.SERVER_PATH}${filePath}` : null;

    const uploadCV = await UploadCV.create({
      name,
      email,
      phone,
      subject,
      message,
      cv,
      isActive: true,
      isDelete: false,
    });

    await sendCVEmail(name, email, phone, subject, message, cv);

    return apiResponse.successResponseWithData(res, "CV uploaded successfully", uploadCV);
  } catch (error) {
    console.error("Upload CV failed", error);
    return apiResponse.ErrorResponse(res, "Upload CV failed");
  }
};

// Email Notification
const sendCVEmail = async (name, email, phone, subject, message, cv) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_SENT_TO,
      cc: process.env.EMAIL_USER,
      subject: `New CV Uploaded by ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p><b>Dear Admin,</b></p>
          <p>${name} has uploaded a CV. Below are their details:</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
            <tr style="background-color: #f4f4f4;">
              <th style="border: 1px solid #ddd; padding: 8px;">Field</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Details</th>
            </tr>
            <tr><td style="border: 1px solid #ddd; padding: 8px;">Name</td><td style="border: 1px solid #ddd; padding: 8px;">${name}</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 8px;">Phone</td><td style="border: 1px solid #ddd; padding: 8px;"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 8px;">Email</td><td style="border: 1px solid #ddd; padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 8px;">Subject</td><td style="border: 1px solid #ddd; padding: 8px;">${subject}</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 8px;">Message</td><td style="border: 1px solid #ddd; padding: 8px;">${message}</td></tr>
            <tr><td style="border: 1px solid #ddd; padding: 8px;">CV</td><td style="border: 1px solid #ddd; padding: 8px;"><a href="${cv}" target="_blank">Download CV</a></td></tr>
          </table>
          <p style="margin-top: 20px;"><b>Best regards,</b><br>Your Website</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending failed", error);
  }
};

// Update Upload CV
exports.updateUploadCV = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(", "));
  }

  try {
    const { id } = req.params;
    const { name, email, phone, subject, message } = req.body;

    const uploadCV = await UploadCV.findByPk(id);
    if (!uploadCV) {
      return apiResponse.notFoundResponse(res, "CV entry not found");
    }

    uploadCV.name = name;
    uploadCV.email = email;
    uploadCV.phone = phone;
    uploadCV.subject = subject;
    uploadCV.message = message;

    if (req.file) {
      const newPath = req.file.path.replace(/\\/g, "/");
      uploadCV.cv = `${process.env.SERVER_PATH}${newPath}`;
    }

    await uploadCV.save();

    return apiResponse.successResponseWithData(res, "CV updated successfully", uploadCV);
  } catch (error) {
    console.error("Update CV failed", error);
    return apiResponse.ErrorResponse(res, "Update CV failed");
  }
};

// Get All CVs
exports.getUploadCVs = async (req, res) => {
  try {
    const uploadCVs = await UploadCV.findAll({ where: { isDelete: false } });

    const updatedCVs = uploadCVs.map(cv => ({
      ...cv.toJSON(),
      cv: cv.cv || null, // ✅ Don't double prepend
    }));

    return apiResponse.successResponseWithData(res, "CVs retrieved successfully", updatedCVs);
  } catch (error) {
    console.error("Get CVs failed", error);
    return apiResponse.ErrorResponse(res, "Get CVs failed");
  }
};

// Toggle isActive
exports.toggleCVStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const uploadCV = await UploadCV.findByPk(id);

    if (!uploadCV) {
      return apiResponse.notFoundResponse(res, "CV entry not found");
    }

    uploadCV.isActive = !uploadCV.isActive;
    await uploadCV.save();

    return apiResponse.successResponseWithData(res, "CV status updated successfully", uploadCV);
  } catch (error) {
    console.error("Toggle CV status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle CV status failed");
  }
};

// Toggle isDelete
exports.toggleCVDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const uploadCV = await UploadCV.findByPk(id);

    if (!uploadCV) {
      return apiResponse.notFoundResponse(res, "CV entry not found");
    }

    uploadCV.isDelete = !uploadCV.isDelete;
    await uploadCV.save();

    return apiResponse.successResponseWithData(res, "CV delete status updated successfully", uploadCV);
  } catch (error) {
    console.error("Toggle CV delete failed", error);
    return apiResponse.ErrorResponse(res, "Toggle CV delete failed");
  }
};
