const express = require("express");
const router = express.Router();
const fileStorage = require("../controller/FileSystem_Controller");

router.get("/", fileStorage.all);
module.exports = router;
