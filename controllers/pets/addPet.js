const { Pet } = require("../../models/pets");
const { HttpError } = require("../helpers");
const Jimp = require("jimp");
const fs = require("fs/promises");
// const path = require("path"); // need for avatarDir
const cloudinary = require("../../helpers/cloudinary");

const { ObjectId } = require("mongodb");

// const avatarDir = path.join(__dirname, "../../", "public", "pets");
const imgSizePx = 250;

const addPet = async (req, res) => {
  const { _id } = req.user;
  const newId = new ObjectId(_id);

  const { path: tempUpload } = req.file;
  const jimpAvatar = await Jimp.read(tempUpload);
  await jimpAvatar
    .resize(imgSizePx, imgSizePx, Jimp.RESIZE_BEZIER)
    .writeAsync(tempUpload);

  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, "petly_dir/pets");
    const newPath = await uploader(tempUpload);
    fs.unlink(req.file.path);

    const newPet = await Pet.create({
      ...req.body,
      avatar: newPath.url,
      owner: newId,
    });

    res.status(201).json({
      message: "success",
      data: { result: newPet },
    });
  } catch (error) {
    // await fs.unlink(req.file.path);
    console.log("====addPet error:", error);
    HttpError(400, error.message);
  }
};

module.exports = addPet;
