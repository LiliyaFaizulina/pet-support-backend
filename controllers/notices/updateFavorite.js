const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { noticeId } = req.params;
  const { _id, favoriteNotices = [] } = req.user;

  const index = favoriteNotices.indexOf(noticeId);
  if (index === -1) {
    favoriteNotices.push(noticeId);
  } else {
    favoriteNotices.splice(index, 1);
  }
  const user = await User.findByIdAndUpdate(
    _id,
    { favoriteNotices },
    { new: true }
  );
  if (!user) {
    throw HttpError(404);
  }
  res.json({
    user: { email: user.email, favoriteNotices: user.favoriteNotices },
  });
};

module.exports = updateFavorite;
