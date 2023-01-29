const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notices");

const getNoticesByCategory = async (req, res) => {
  const { q } = req.query;

  const unsortedNotices = await Notice.find({ $text: { $search: q } });

  if (!unsortedNotices) {
    throw HttpError(404);
  }
  const notices = [...unsortedNotices].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );
  res.json({ notices });
};

module.exports = getNoticesByCategory;
