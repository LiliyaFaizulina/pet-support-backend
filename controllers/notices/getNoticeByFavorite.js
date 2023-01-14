const { Notice } = require("../../models/notices");
const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");

const getNoticeByFavorite = async (req, res) => {
  const { _id, favoriteNotices } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(404);
  }
  res.json({ message: "success", user });
};

module.exports = getNoticeByFavorite;
