const { Pet } = require("../../models/pets");
const { HttpError } = require("../../helpers");
// const Jimp = require("jimp");
const fs = require("fs/promises");
// const cloudinary = require("../../helpers/cloudinary");
const cloudinary = require('cloudinary').v2

// const imgSizePx = 250;

const addPet = async (req, res) => {
  const { _id } = req.user;
  if(!req.file) {
    throw HttpError (404, "Avatar is required")
  };
  const { path: tempUpload } = req.file;
  // const jimpAvatar = await Jimp.read(tempUpload);
  // await jimpAvatar
  //   .resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER)
  //   .writeAsync(tempUpload); // это можно сделать через клаудинари (дополнительная библиотека)
  // try {
  //   const uploader = async (path) =>
  //     await cloudinary.uploads(path);
  //   const newPath = await uploader(tempUpload);
  //   fs.unlink(req.file.path);
  //   const newPet = await Pet.create({
  //     ...req.body,
  //     avatar: newPath.url,
  //     owner: _id, // исправлено
  //   });
  //   res.status(201).json({
  //     message: "success",
  //     newPet,
  //   });``
  // } catch (error) {
  //   // await fs.unlink(req.file.path); // новый комент
  //   console.log("====addPet error:", error);
  //   HttpError(400, error.message);
  // }
  const { url } = await cloudinary.uploader.upload(tempUpload);

    fs.unlink(req.file.path);
    const newPet = await Pet.create({
      ...req.body,
      avatar: url,
      owner: _id, // исправлено
    });

    res.status(201).json({
      message: "success",
      newPet,
    });
};

module.exports = addPet;
