const express = require("express");
const router = express.Router();
const item = require("../controller/rbacAuthItem_Controllers");

router.get("/", item.all);
router.get("/:name", item.show);
router.post("/", item.create);
router.put("/:name", item.update);
router.delete("/:name", item.hapus);

module.exports = router;
