const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notices");

const getNoticesByCategory = async (req, res) => {
  const { q } = req.query;

  const notices = await Notice.find({ $text: { $search: q } });

  if (!notices) {
    throw HttpError(404);
  }
  const sortNotices = [...notices].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );
  res.json({ sortNotices });
};

module.exports = getNoticesByCategory;
