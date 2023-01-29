const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notices");

const getNoticesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const unsortedNotices = await Notice.find({ category: categoryName }, "", {
    skip,
    limit,
  });
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
