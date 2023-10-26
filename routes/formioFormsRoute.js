const express = require("express");
const router = express.Router();
const forms = require("../controller/FormioForms_Controllers");

router.get("/", forms.all);
router.get("/:id", forms.show);
router.post("/", forms.create);
router.put("/:id", forms.update);
router.delete("/:id", forms.hapus);

module.exports = router;
