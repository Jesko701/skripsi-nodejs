const express = require("express");
const router = express.Router();
const articleCategory = require("../controller/ArticleCategory_Controllers");

router.get("/", articleCategory.all);
router.get("/:id", articleCategory.show);
router.post("/", articleCategory.create);
router.put("/:id", articleCategory.update);
router.delete("/:id", articleCategory.hapus);

module.exports = router;
