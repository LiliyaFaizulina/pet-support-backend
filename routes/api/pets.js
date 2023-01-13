const express = require("express");

const router = express.Router();

const {
  validateBody,
  authenticate,
  isValidId,
  upload,
} = require("../../midlewares");
const { ctrlWrapper } = require("../../helpers");

const { schemasPet } = require("../../models/pets");
const {
  addPet,
  getUser,
  removePetById,
  updateUser,
} = require("../../controllers/pets");

router.get("/", authenticate, ctrlWrapper(getUser));

router.post(
  "/",
  authenticate,
  upload.single("avatar"),
  validateBody(schemasPet.addPetSchema),
  ctrlWrapper(addPet)
);

router.delete("/:petsId", authenticate, isValidId, ctrlWrapper(removePetById));

router.patch("/:properties", authenticate, ctrlWrapper(updateUser));

module.exports = router;
