const express = require("express");

const router = express.Router();

const { validateBody, authenticate, upload } = require("../../midlewares");
const { ctrlWrapper } = require("../../helpers");

const { schemasPet } = require("../../models/pets");
const { addPet, removePetById } = require("../../controllers/pets");

router.post(
  "/",
  authenticate,
  upload.single("petAvatar"),
  validateBody(schemasPet.addPetSchema),
  ctrlWrapper(addPet)
);

router.delete("/:id", authenticate, ctrlWrapper(removePetById));

module.exports = router;
