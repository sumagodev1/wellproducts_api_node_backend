const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const multer = require("multer");

const upload = multer({ dest: "uploads/news/" }); // or custom storage

router.post("/create-news", upload.single("img"), newsController.addNewsEvent);
router.put("/update-news/:id", upload.single("img"), newsController.updateNewsEvent);
router.get("/get-news", newsController.getNewsEvents);
router.patch("/toggle-active/:id", newsController.toggleActiveStatus);
router.delete("/isdelete-news/:id", newsController.toggleDeleteStatus);

module.exports = router;
