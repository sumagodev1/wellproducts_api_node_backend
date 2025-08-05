const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const multer = require("multer");
const { validateClient, validateClientId } = require("../validations/clientValidation");

// Multer setup for client image uploads
const upload = multer({ dest: "uploads/clients/" }); // You can customize storage if needed

// ✅ Routes
router.post("/add-client", upload.single("img"), validateClient, clientController.addClient);
router.put("/update-client/:id", upload.single("img"), validateClientId, validateClient, clientController.updateClient);
router.get("/get-client", clientController.getClient);
router.patch("/toggle-active/:id", validateClientId, clientController.toggleActiveStatus);
router.delete("/isdelete-client/:id", validateClientId, clientController.toggleDeleteStatus);

module.exports = router;
