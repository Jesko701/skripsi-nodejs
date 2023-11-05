const express = require("express");
const router = express.Router();
const submission = require("../controller/FormioSubmission_Controllers");

router.get("/", submission.all);
router.get("/pagination", submission.dataPagination);
router.get("/:id", submission.show);
router.post("/", submission.create);
router.put("/:id", submission.update);
router.delete("/:id", submission.hapus);

module.exports = router;
