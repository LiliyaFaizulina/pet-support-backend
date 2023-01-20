const { login, register, logout, refreshToken } = require("./auth");
const { editAvatar, updateUserById } = require("./updateUser");
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
};
