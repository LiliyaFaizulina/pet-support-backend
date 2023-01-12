const cntrlWrapper = require("../../helpers/cntrlWrapper");
const getNoticesByCategory = require("./getNoticesByCategory");
const getNoticeById = require("./getNoticeById");

module.exports = {
  getNoticesByCategory: cntrlWrapper(getNoticesByCategory),
  getNoticeById: cntrlWrapper(getNoticeById),
};
