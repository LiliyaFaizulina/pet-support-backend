const { Notice } = require("../../models/notices");
const { HttpError } = require("../../helpers/HttpError");

const getNoticeByFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const notice = await Notice.find({owner, favorite: true});
  if (!notice) {
    throw HttpError(404);
  }
  res.json(notice);
};

module.exports = getNoticeByFavorite;
