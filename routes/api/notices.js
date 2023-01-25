const express = require("express");
const controller = require("../../controllers/notices");
const { authenticate, upload } = require("../../midlewares");

const router = express.Router();

router.get("/own", authenticate, controller.getUserNotices);
router.get("/favorite", authenticate, controller.getNoticeByFavorite);
router.get("/search", controller.getNoticeByKeywodInTitle);
router.get("/notice/:noticeId", controller.getNoticeById);
router.get("/:categoryName", controller.getNoticesByCategory);
router.post(
  "/notice",
  authenticate,
  upload.single("image"),
  controller.addNoticeByCategory
);
router.patch("/:noticeId", authenticate, controller.updateFavorite);
router.delete("/:noticeId", authenticate, controller.deleteNoticeById);

module.exports = router;
