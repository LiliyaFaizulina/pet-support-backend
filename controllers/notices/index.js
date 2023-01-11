const cntrlWrapper = require("../../helpers/cntrlWrapper");
const getNotices = require("./getNotices");
const getNoticesByCategory = require("./getNoticesByCategory");
const getNoticeById = require("./getNoticeById");

module.exports = {
  getNotices: cntrlWrapper(getNotices),
  getNoticesByCategory: cntrlWrapper(getNoticesByCategory),
  getNoticeById: cntrlWrapper(getNoticeById),
};
