const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const bcrypt = require("bcrypt");
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

const updatePassword = async (req, res) => {
  const { _id } = req.user;
  const { password, newPassword } = req.body;

  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(400, "Not found");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(400, "Password is wrong");
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(_id, { password: hashPassword });

  res.json({ message: "Password updated successfully" });
};

module.exports = {
  updateUserById,
  editAvatar,
  updatePassword,
};
