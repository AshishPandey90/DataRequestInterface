const express = require("express");
const RecordController = require("../controllers/records");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", extractFile, RecordController.createRecord);

router.post("/createuser", extractFile, RecordController.createUser);

module.exports = router;
