const { Op } = require("sequelize");
const Client = require("../models/Client");
const apiResponse = require("../helper/apiResponse");

// ✅ Create Client with duplicate name check
exports.addClient = async (req, res) => {
  try {
    const { clientName } = req.body;
    const img = req.file ? req.file.path : null;

    // Check for existing clientName (case-sensitive)
    const existingClient = await Client.findOne({
      where: {
        clientName: clientName.trim(),
        isDelete: false,
      },
    });

    if (existingClient) {
      return apiResponse.validationErrorWithData(
        res,
        "A client with this name already exists"
      );
    }

    const client = await Client.create({
      img,
      clientName,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(res, "Client data created successfully", client);
  } catch (error) {
    console.error("Add Client failed", error);
    return apiResponse.ErrorResponse(res, "Add client failed");
  }
};

// ✅ Update Client with duplicate name check
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName } = req.body;
    const img = req.file ? req.file.path : null;

    const client = await Client.findByPk(id);
    if (!client) {
      return apiResponse.notFoundResponse(res, "Client not found");
    }

    // Check for duplicate clientName excluding current client
    const existing = await Client.findOne({
      where: {
        clientName: clientName.trim(),
        isDelete: false,
        id: { [Op.ne]: id },
      },
    });

    if (existing) {
      return apiResponse.validationErrorWithData(
        res,
        "Another client with this name already exists"
      );
    }

    client.img = img || client.img;
    client.clientName = clientName;

    await client.save();

    return apiResponse.successResponseWithData(res, "Client updated successfully", client);
  } catch (error) {
    console.error("Update client failed", error);
    return apiResponse.ErrorResponse(res, "Update client failed");
  }
};

// ✅ Get All Clients
exports.getClient = async (req, res) => {
  try {
    const clientList = await Client.findAll({
      where: { isDelete: false },
    });

    const baseUrl = process.env.SERVER_PATH || "";

    const formatted = clientList.map((client) => ({
      ...client.toJSON(),
      img: client.img ? baseUrl + client.img.replace(/\\/g, "/") : null,
    }));

    return apiResponse.successResponseWithData(res, "Client list fetched successfully", formatted);
  } catch (error) {
    console.error("Fetch client data failed", error);
    return apiResponse.ErrorResponse(res, "Fetch client data failed");
  }
};

// ✅ Toggle Active Status
exports.toggleActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return apiResponse.notFoundResponse(res, "Client not found");
    }

    client.isActive = !client.isActive;
    await client.save();

    return apiResponse.successResponseWithData(res, "Client active status updated", client);
  } catch (error) {
    console.error("Toggle active status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle active status failed");
  }
};

// ✅ Toggle Delete Status
exports.toggleDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return apiResponse.notFoundResponse(res, "Client not found");
    }

    client.isDelete = !client.isDelete;
    await client.save();

    return apiResponse.successResponseWithData(res, "Client delete status updated", client);
  } catch (error) {
    console.error("Toggle delete failed", error);
    return apiResponse.ErrorResponse(res, "Toggle delete failed");
  }
};
