const { Notice } = require("../../models/notices");
const { HttpError } = require("../../helpers/HttpError");

const getNoticeByFavorite = async (req, res) => {
  const { _id, favoriteNotices } = req.user;
  const notices = await Notice.find({ _id: favoriteNotices });
  if (!notices) {
    throw HttpError(404);
  }
  res.json({ message: "success", favoriteNotices: notices });
};

module.exports = getNoticeByFavorite;
