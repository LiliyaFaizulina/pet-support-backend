const { Pet } = require("../../models/pets");
const { HttpError } = require("../../helpers");
const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;

const addPet = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    throw HttpError(400, "Avatar is required");
  }
  const { path: tempUpload } = req.file;

  const { url } = await cloudinary.uploader.upload(tempUpload);

  fs.unlink(req.file.path);
  const newPet = await Pet.create({
    ...req.body,
    petAvatar: url,
    owner: _id,
  });

  res.status(201).json({
    message: "success",
    newPet,
  });
};

module.exports = addPet;
