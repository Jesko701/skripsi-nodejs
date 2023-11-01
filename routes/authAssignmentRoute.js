const express = require("express");
const router = express.Router();
const assign = require("../controller/rbacAuthItemAssignment_Controllers");

router.get("/", assign.all);
router.get("/:user_id", assign.show);
router.post("/", assign.create);
router.put("/:user_id", assign.update);
router.delete("/:user_id", assign.hapus);

module.exports = router;
