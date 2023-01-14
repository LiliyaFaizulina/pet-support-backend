const ctrlWrapper = require("../../helpers/ctrlWrapper");
const getNoticesByCategory = require("./getNoticesByCategory");
const getNoticeById = require("./getNoticeById");
const addNoticeByCategory = require("./addNoticeByCategory");
const getNoticeByFavorite = require("./getNoticeByFavorite");
const myAddsNoticeUser = require("./myAddsNoticeUser");

module.exports = {
  getNoticesByCategory: ctrlWrapper(getNoticesByCategory),
  getNoticeById: ctrlWrapper(getNoticeById),
  addNoticeByCategory: ctrlWrapper(addNoticeByCategory),
  getNoticeByFavorite: ctrlWrapper(getNoticeByFavorite),
  myAddsNoticeUser: ctrlWrapper(myAddsNoticeUser)
};
