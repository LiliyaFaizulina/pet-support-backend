const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const { Notice } = require("../../models/notices");

const addNoticeByCategory = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: tempUpload } = req.file;
  const { url } = await cloudinary.uploader.upload(tempUpload);
  const image = url;

  const result = await Notice.create({
    ...req.body,
    image,
    owner,
  });
  fs.unlink(tempUpload);

  res.status(201).json({ notice: result });
};

module.exports = addNoticeByCategory;
