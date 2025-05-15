// const JobPost = require("../models/JobPost");
// const apiResponse = require("../helper/apiResponse");
// const nodemailer = require("nodemailer");
// const { validationResult } = require('express-validator');

// exports.addJobPost = async (req, res) => {
//    if (!errors.isEmpty()) {
//       return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
//     }
//   try {
//     const { jobtitle,description,education,experience, email, phone} = req.body;
//     // let newDataVal = req.file ? req.file.path : null;
//     // const cv = newDataVal.replace(/\\/g, "/");
//     // const cv = process.env.SERVER_PATH + newDataVal.replace(/\\/g, "/");

//     const jobpost= await JobPost.create({
//       jobtitle,
//       description,
//       education,
//       experience,
//       email,
//       phone,
//       isActive: true,
//       isDelete: false,
//     });

//     // console.log("cv__________", cv);

//     // Send email notification
//     console.log("Calling sendjobpostEmail...");
//     await sendjobpostEmail(jobtitle,description,education,experience, email, phone);
//     console.log("Email function executed successfully.");

//     return apiResponse.successResponseWithData(
//       res,
//       "Jobpost Uploaded successfully",
//       jobpost
//     );
//   } catch (error) {
//     console.error("Upload jobpost data failed", error);
//     return apiResponse.ErrorResponse(res, "Upload jobpost data failed");
//   }
// };

// const sendjobpostEmail = async (jobtitle,description,education,experience, email, phone) => {
//   console.log("sendjobpostEmail function is called with:", jobtitle,description,education,experience, email, phone);

//   try {
//     console.log("Creating Gmail transporter...");
    
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     console.log("Gmail Transporter created");

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_SENT_TO,
//       cc:process.env.EMAIL_USER,
//       subject: `New Job post Uploaded by ${jobtitle}`,
//       text: `Dear Admin,\n\n${jobtitle} has uploaded a jobpost. Below are their details:\n\nJob Title: ${jobtitle}\nDescription: ${description}\nEducation: ${education}\nExperience: ${experience}\nPhone: ${phone}\nEmail: ${email}\n\nBest regards,\nYour Website`,
//       html: `
//         <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//           <p><b>Dear Admin,</b></p>
//           <p>${jobtitle} has uploaded job post. Below are their details:</p>
//           <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
//             <tr style="background-color: #f4f4f4;">
//               <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Field</th>
//               <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Details</th>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #ddd; padding: 8px;">Job Title</td>
//               <td style="border: 1px solid #ddd; padding: 8px;">${jobtitle}</td>
//             </tr>
//               <tr style="background-color: #f9f9f9;">
//               <td style="border: 1px solid #ddd; padding: 8px;">Description</td>
//               <td style="border: 1px solid #ddd; padding: 8px;">${description}</td>
//             </tr>
//               <tr style="background-color: #f9f9f9;">
//               <td style="border: 1px solid #ddd; padding: 8px;">Education</td>
//               <td style="border: 1px solid #ddd; padding: 8px;">${education}</td>
//             </tr>
//               <tr style="background-color: #f9f9f9;">
//               <td style="border: 1px solid #ddd; padding: 8px;">Experience</td>
//               <td style="border: 1px solid #ddd; padding: 8px;">${experience}</td>
//             </tr>
//             <tr style="background-color: #f9f9f9;">
//               <td style="border: 1px solid #ddd; padding: 8px;">Phone</td>
//               <td style="border: 1px solid #ddd; padding: 8px;"><a href="tel:${phone}" style="color: #007BFF; text-decoration: none;">${phone}</a></td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #ddd; padding: 8px;">Email</td>
//               <td style="border: 1px solid #ddd; padding: 8px;"><a href="mailto:${email}" style="color: #007BFF; text-decoration: none;">${email}</a></td>
//             </tr>
//           </table>
//           <br>
//           <p style="border-top: 1px solid #ddd; padding-top: 10px;"><b>Best regards,</b><br>Your Website</p>
//         </div>`
//     };

//     console.log("Sending email with options:", mailOptions);
    
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully:", info.response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// exports.updateJobPost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { jobtitle,description,education,experience, email, phone} = req.body;
//     // const cv = req.file ? req.file.path : null;

//     const jobpost = await JobPost.findByPk(id);
//     if (!jobpost) {
//       return apiResponse.notFoundResponse(res, "Job post not found");
//     }

//     jobpost.jobtitle = jobtitle;
//     jobpost.description = description;
//     jobpost.education = education;
//     jobpost.experience = experience
//     jobpost.email = email;
//     jobpost.phone = phone;
//     await jobpost.save();

//     return apiResponse.successResponseWithData(
//       res,
//       "Jobpost updated successfully",
//       jobpost
//     );
//   } catch (error) {
//     if (error.name === "SequelizeUniqueConstraintError") {
//       const fields = error.errors.map((err) => err.path);
//       let message = "Validation error: ";

//       if (fields.includes("email")) {
//         message += "Email already exists. ";
//       }
//       if (fields.includes("phone")) {
//         message += "Phone number already exists. ";
//       }

//       return apiResponse.validationErrorWithData(res, message.trim());
//     }

//     console.error("Update jobpost failed", error);
//     return apiResponse.ErrorResponse(res, "Update job post failed");
//   }
// };

// exports.getJobPost = async (req, res) => {
//   try {
//     const jobpost = await JobPost.findAll({ where: { isDelete: false } });

//     const baseUrl = `${process.env.SERVER_PATH}`;
//     const jobpostWithBaseUrl = jobpost.map((job) => {
//       return {
//         ...job.toJSON(),
//         job: job.job ? baseUrl + job.job.replace(/\\/g, "/") : null,
//       };
//     });

//     return apiResponse.successResponseWithData(
//       res,
//       "Job post retrieved successfully",
//       jobpostWithBaseUrl
//     );
//   } catch (error) {
//     console.error("Get job post data failed", error);
//     return apiResponse.ErrorResponse(res, "Get job post data failed");
//   }
// };

// exports.togglejobpostStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const jobpost = await JobPost.findByPk(id);

//     if (!jobpost) {
//       return apiResponse.notFoundResponse(res, "Job Post not found");
//     }

//     jobpost.isActive = !jobpost.isActive;
//     await jobpost.save();

//     return apiResponse.successResponseWithData(
//       res,
//       "Job Post status updated successfully",
//       jobpost
//     );
//   } catch (error) {
//     console.error("Toggle job post status failed", error);
//     return apiResponse.ErrorResponse(res, "Toggle job post status failed");
//   }
// };

// exports.togglejobpostDelete = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const jobpost = await JobPost.findByPk(id);

//     if (!jobpost) {
//       return apiResponse.notFoundResponse(res, "Job post not found");
//     }

//     jobpost.isDelete = !jobpost.isDelete;
//     await jobpost.save();

//     return apiResponse.successResponseWithData(
//       res,
//       "Job post delete status updated successfully",
//       jobpost
//     );
//   } catch (error) {
//     console.error("Toggle Job post delete status failed", error);
//     return apiResponse.ErrorResponse(res, "Toggle Job post delete status failed");
//   }
// };


const JobPost = require('../models/JobPost');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

exports.addJobPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }
  try {
    const { jobtitle,description,education,experience,phone,email } = req.body;


    const jobpost = await JobPost.create({ 
      jobtitle,description,education,experience,phone,email, 
      isActive: true, isDelete: false 
    });
    return apiResponse.successResponseWithData(res, 'job post added successfully', jobpost);
  } catch (error) {
    console.error('Add job post failed', error);
    return apiResponse.ErrorResponse(res, 'Add job post failed');
  }
};

exports.updateJobPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }
  try {
    const { id } = req.params;
    const { jobtitle,description,education,experience,email,phone } = req.body;

    const jobpost = await JobPost.findByPk(id);
    if (!jobpost) {
      return apiResponse.notFoundResponse(res, 'Job post not found');
    }
     
    jobpost.jobtitle = jobtitle;
    jobpost.description = description;
    jobpost.education= education;
    jobpost.experience = experience;
    jobpost.phone = phone;
    jobpost.email = email;
    await jobpost.save();

    return apiResponse.successResponseWithData(res, 'Job post updated successfully', jobpost);
  } catch (error) {
    console.error('Update job post failed', error);
    return apiResponse.ErrorResponse(res, 'Update job post failed');
  }
};

exports.getJobPost = async (req, res) => {
  try {
    const jobpost = await JobPost.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
    const jobpostWithBaseUrl = jobpost.map(event => {
      return {
        ...event.toJSON(),
      };
    });

    return apiResponse.successResponseWithData(res, 'Job post retrieved successfully', jobpostWithBaseUrl);
  } catch (error) {
    console.error('Get job post data failed', error);
    return apiResponse.ErrorResponse(res, 'Get job post data failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const jobpost = await JobPost.findByPk(id);

    if (!jobpost) {
      return apiResponse.notFoundResponse(res, 'Job Post not found');
    }

    jobpost.isActive = !jobpost.isActive;
    await jobpost.save();

    return apiResponse.successResponseWithData(res, 'Job post status updated successfully', jobpost);
  } catch (error) {
    console.error('Job post information status failed', error);
    return apiResponse.ErrorResponse(res, 'Job Post information status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const jobpost = await JobPost.findByPk(id);

    if (!jobpost) {
      return apiResponse.notFoundResponse(res, 'Job post information not found');
    }

    jobpost.isDelete = !jobpost.isDelete;
    await jobpost.save();

    return apiResponse.successResponseWithData(res, 'Job Post delete status updated successfully', jobpost);
  } catch (error) {
    console.error('Job post delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Job post delete status failed');
  }
};
