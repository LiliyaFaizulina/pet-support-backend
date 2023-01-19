const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const { User } = require("../../models/user");

const updateUserById = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "User not found");
  }
  res.json({
    _id: result._id,
    name: result.name,
    city: result.city,
    phone: result.phone,
    email: result.email,
    birthday: result.birthday,
    avatarURL: result.avatarURL,
    favoriteNotices: result.favoriteNotices,
  });
};
const editAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload } = req.file;
  const { url } = await cloudinary.uploader.upload(tempUpload);
  const avatarURL = url;
  await User.findByIdAndUpdate(_id, { avatarURL });
  fs.unlink(tempUpload);
  res.json({
    avatarURL,
  });
};

module.exports = {
  updateUserById,
  editAvatar,
};
