const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notices");

const getUserNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const notice = await Notice.find({ owner });
  if (!notice) {
    throw HttpError(404);
  }
  res.json(notice);
};

module.exports = getUserNotices;
