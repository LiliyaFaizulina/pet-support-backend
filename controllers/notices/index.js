const ctrlWrapper = require("../../helpers/ctrlWrapper");
const getNoticesByCategory = require("./getNoticesByCategory");
const getNoticeById = require("./getNoticeById");
const addNoticeByCategory = require("./addNoticeByCategory");

module.exports = {
  getNoticesByCategory: ctrlWrapper(getNoticesByCategory),
  getNoticeById: ctrlWrapper(getNoticeById),
  addNoticeByCategory: ctrlWrapper(addNoticeByCategory),
};
