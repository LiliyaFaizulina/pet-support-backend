const { Notice } = require("../../models/notices");
const { HttpError } = require("../../helpers/HttpError");

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId);
  if (!notice) {
    throw HttpError(404);
  }
  res.json({ notice });
};

module.exports = getNoticeById;
