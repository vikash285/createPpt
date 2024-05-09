const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");
const multer = require("multer");
const upload = multer({ dest: "public/" });

router.post("/upload", upload.single("uploadImg"), controller.upload);

module.exports = router;
