const { Notice } = require("../../models/notices");
const { HttpError } = require("../../helpers");

const deleteNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;
  const deletedNotice = await Notice.findOneAndDelete({ _id: noticeId, owner });
  if (!deletedNotice) {
    throw HttpError(404);
  }
  res.json({ deletedNotice });
};

module.exports = deleteNoticeById;
