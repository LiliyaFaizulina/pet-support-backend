const express = require("express");
const controller = require("../../controllers/notices");

const router = express.Router();

router.get("/:categoryName", controller.getNoticesByCategory);
router.get("/:noticeId", controller.getNoticeById);

module.exports = router;
