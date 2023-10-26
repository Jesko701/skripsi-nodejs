const express = require("express");
const router = express.Router();
const articleAttachment = require("../controller/ArticleAttachments_Controllers");

router.get("/", articleAttachment.all);
router.get("/:id", articleAttachment.show);
router.post("/", articleAttachment.create);
router.put("/:id", articleAttachment.update);
router.delete("/:id", articleAttachment.hapus);

module.exports = router;
