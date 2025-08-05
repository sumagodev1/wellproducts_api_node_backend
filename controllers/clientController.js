const Client = require("../models/Client");
const apiResponse = require("../helper/apiResponse");

// ✅ Create Client
exports.addClient = async (req, res) => {
  try {
    const { clientName } = req.body;
    const img = req.file ? req.file.path : null;

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

// ✅ Update Client
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName } = req.body;
    const img = req.file ? req.file.path : null;

    const client = await Client.findByPk(id);
    if (!client) {
      return apiResponse.notFoundResponse(res, "Client not found");
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
