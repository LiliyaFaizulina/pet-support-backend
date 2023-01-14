const express = require("express");
const controller = require("../../controllers/notices");
const { authenticate } = require("../../midlewares");

const router = express.Router();

router.get("/own", authenticate, controller.getUserNotices);
router.get("/favorite", authenticate, controller.getNoticeByFavorite);
router.get("/:categoryName", controller.getNoticesByCategory);
router.get("/:noticeId", controller.getNoticeById);
router.put("/:categoryName", authenticate, controller.addNoticeByCategory);
router.patch("/:noticeId", authenticate, controller.updateFavorite);
router.delete("/:noticeId", authenticate, controller.deleteNoticeById);

module.exports = router;
