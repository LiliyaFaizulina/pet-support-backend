const express = require("express");

const router = express.Router();

const {
  validateBody,
  authenticate,
   upload,
} = require("../../midlewares");
const { ctrlWrapper } = require("../../helpers");

const { schemasPet } = require("../../models/pets");
const { addPet, getUser, removePetById } = require("../../controllers/pets");

router.get("/", authenticate, ctrlWrapper(getUser));

router.post(
  "/",
  authenticate,
  upload.single("petAvatar"),
  validateBody(schemasPet.addPetSchema),
  ctrlWrapper(addPet)
);

router.delete("/:petsId", authenticate, ctrlWrapper(removePetById));

module.exports = router;
