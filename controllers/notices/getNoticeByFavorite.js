const { Notice } = require("../../models/notices");
const { HttpError } = require("../../helpers");

const getNoticeByFavorite = async (req, res) => {
  const { favoriteNotices } = req.user;
  const notices = await Notice.find({ _id: favoriteNotices });
  if (!notices) {
    throw HttpError(404);
  }
  const sortNotices = [...notices].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );
  res.json({ sortNotices });
};

module.exports = getNoticeByFavorite;
