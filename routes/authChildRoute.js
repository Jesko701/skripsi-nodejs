const express = require("express");
const router = express.Router();
const child = require("../controller/rbacAuthItemChild_Controllers");

router.get("/", child.all);
router.get("/:parent", child.show);
router.post("/", child.create);
router.put("/:parent", child.update);
router.delete("/:parent", child.hapus);

module.exports = router;
