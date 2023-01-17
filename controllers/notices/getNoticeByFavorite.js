const { Notice } = require("../../models/notices");
const { HttpError } = require("../../helpers");

const getNoticeByFavorite = async (req, res) => {
  const { favoriteNotices } = req.user;
  const notices = await Notice.find({ _id: favoriteNotices });
  if (!notices) {
    throw HttpError(404);
  }
  res.json({ notices });
};

module.exports = getNoticeByFavorite;
