const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notices");

const getNoticesByCategory = async (req, res) => {
  const { q } = req.query;

  console.log(req.query);

  const notices = await Notice.find({ $text: { $search: q } });

  if (!notices) {
    throw HttpError(404);
  }
  res.json({ notices });
};

module.exports = getNoticesByCategory;
