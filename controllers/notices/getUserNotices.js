const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notices");

const getUserNotices = async (req, res) => {
  const { _id: owner, email } = req.user;
  const notices = await Notice.find({ owner });
  if (!notices) {
    throw HttpError(404);
  }
  res.json({ user: email, notices });
};

module.exports = getUserNotices;
