const {
  login,
  register,
  logout,
  refreshToken,
  restorePassword,
} = require("./auth");
const { editAvatar, updateUserById, updatePassword } = require("./updateUser");
const getUser = require("./getUser");
const { ctrlWrapper } = require("../../helpers");

module.exports = {
  login: ctrlWrapper(login),
  register: ctrlWrapper(register),
  updateUserById: ctrlWrapper(updateUserById),
  editAvatar: ctrlWrapper(editAvatar),
  logout: ctrlWrapper(logout),
  refreshToken: ctrlWrapper(refreshToken),
  getUser: ctrlWrapper(getUser),
  updatePassword: ctrlWrapper(updatePassword),
  restorePassword: ctrlWrapper(restorePassword),
};
