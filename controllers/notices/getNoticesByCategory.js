const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notices");

const getNoticesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const notices = await Notice.find({ category: categoryName }, "", {
    skip,
    limit,
  });
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
