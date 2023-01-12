const express = require("express");

const router = express.Router();

const {
  validateBody,
  authenticate,
  isValidId,
  upload,
} = require("../middleware/");
const { ctrlWrapper } = require("../helpers");

const { schemasPet } = require("../models/pets");
const {
  addPet,
  getUser,
  removePetById,
  updateUser,
} = require("../controllers/pets");

router.get("/", authenticate, ctrlWrapper(getUser));
// router.get("/notice", authenticate, ctrlWrapper(ctrl.getUserNotice));
// router.get("/favorite", authenticate, ctrlWrapper(ctrl.getFavoriteNotice));

// ------  url/user/favorite?notice_id=6372bb9b6b1a551c201218ef - у квері id notice
// router.delete(
//   "/favorite",
//   authenticate,
//   ctrlWrapper(ctrl.removeFavoriteNotice)
// );
// router.post("/favorite", authenticate, ctrlWrapper(ctrl.addFavorite));

router.post(
  "/pets",
  authenticate,
  upload.single("avatar"),
  validateBody(schemasPet.addPetSchema),
  ctrlWrapper(addPet)
);

router.delete(
  "/pets/:petsId",
  authenticate,
  isValidId,
  ctrlWrapper(removePetById)
);
// router.patch(
//   "/avatar",
//   authenticate,
//   upload.single("avatar"),
//   ctrlWrapper(ctrl.updateUserAvatar)
// );
router.patch("/:properties", authenticate, ctrlWrapper(updateUser));

module.exports = router;
