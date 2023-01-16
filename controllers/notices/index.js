const ctrlWrapper = require("../../helpers/ctrlWrapper");
const getNoticesByCategory = require("./getNoticesByCategory");
const getNoticeById = require("./getNoticeById");
const addNoticeByCategory = require("./addNoticeByCategory");
const getNoticeByFavorite = require("./getNoticeByFavorite");
const getUserNotices = require("./getUserNotices");
const updateFavorite = require("./updateFavorite");
const deleteNoticeById = require("./deleteNoticeById");
const getNoticeByKeywodInTitle = require("./getNoticeByKeywodInTitle");

module.exports = {
  getNoticesByCategory: ctrlWrapper(getNoticesByCategory),
  getNoticeById: ctrlWrapper(getNoticeById),
  addNoticeByCategory: ctrlWrapper(addNoticeByCategory),
  getNoticeByFavorite: ctrlWrapper(getNoticeByFavorite),
  getUserNotices: ctrlWrapper(getUserNotices),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteNoticeById: ctrlWrapper(deleteNoticeById),
  getNoticeByKeywodInTitle: ctrlWrapper(getNoticeByKeywodInTitle),
};
