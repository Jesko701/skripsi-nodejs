const express = require("express");
const router = express.Router();
const articleController = require("../controller/Article_Controllers");

router.get("/", articleController.all);
router.get("/:id", articleController.show);
router.post("/", articleController.create);
router.put("/:id", articleController.update);
router.delete("/:id", articleController.hapus);

module.exports = router;
