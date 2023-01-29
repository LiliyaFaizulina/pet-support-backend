const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notices");

const getUserNotices = async (req, res) => {
  const { _id: owner, email } = req.user;
  const unsortedNotices = await Notice.find({ owner });
  if (!unsortedNotices) {
    throw HttpError(404);
  }
  const notices = [...unsortedNotices].sort(
    (firstNotice, secondNotice) =>
      new Date(secondNotice.createdAt) - new Date(firstNotice.createdAt)
  );
  res.json({ user: email, notices });
};

module.exports = getUserNotices;
