const express = require("express");
const controller = require("../../controllers/notices");
const { authenticate } = require("../../midlewares");

const router = express.Router();

router.get("/:categoryName", controller.getNoticesByCategory);
router.get("/:noticeId", controller.getNoticeById);
router.get("/favorite", authenticate, controller.getNoticeByFavorite);
router.put("/:categoryName", controller.addNoticeByCategory);

module.exports = router;
