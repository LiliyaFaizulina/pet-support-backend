const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notices");

const getUserNotices = async (req, res) => {
  const { _id: owner, email } = req.user;
  const notices = await Notice.find({ owner });
  if (!notices) {
    throw HttpError(404);
  }
  const sortNotices = [...notices].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );
  res.json({ user: email, sortNotices });
};

module.exports = getUserNotices;
