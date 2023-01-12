const express = require("express");
const controller = require("../../controllers/notices");

const router = express.Router();

router.get("/:categoryName", controller.getNoticesByCategory);
router.get("/:noticeId", controller.getNoticeById);
router.put("/:categoryName", controller.addNoticeByCategory);

module.exports = router;
