const express = require("express");
const router = express.Router();
const rule = require("../controller/rbacAuthRule_Controllers");

router.get("/", rule.all);
router.get("/:name", rule.show);
router.post("/", rule.create);
router.put("/:name", rule.update);
router.delete("/:name", rule.hapus);

module.exports = router;
