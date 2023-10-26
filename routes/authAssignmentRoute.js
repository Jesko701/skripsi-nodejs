const express = require("express");
const router = express.Router();
const assign = require("../controller/rbacAuthItemAssignment_Controllers");

router.get("/", assign.all);
router.get("/:item_name", assign.show);
router.post("/", assign.create);
router.put("/:item_name", assign.update);
router.delete("/:item_name", assign.hapus);

module.exports = router;
