const ctrlWrapper = require("../../helpers/ctrlWrapper");
const getNoticesByCategory = require("./getNoticesByCategory");
const getNoticeById = require("./getNoticeById");
const addNoticeByCategory = require("./addNoticeByCategory");
const getNoticeByFavorite = require("./getNoticeByFavorite");
const getUserNotices = require("./getUserNotices");

module.exports = {
  getNoticesByCategory: ctrlWrapper(getNoticesByCategory),
  getNoticeById: ctrlWrapper(getNoticeById),
  addNoticeByCategory: ctrlWrapper(addNoticeByCategory),
  getNoticeByFavorite: ctrlWrapper(getNoticeByFavorite),
  getUserNotices: ctrlWrapper(getUserNotices),
};
