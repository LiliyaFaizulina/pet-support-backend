const { Notice } = require("../../models/notices");
const { HttpError } = require("../../helpers");

const getNoticeById = async (req, res) => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId).populate(
    "owner",
    "email phone"
  );
  if (!notice) {
    throw HttpError(404);
  }
  res.json({ notice });
};

module.exports = getNoticeById;
