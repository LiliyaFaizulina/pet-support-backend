const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notices");

const getNoticesByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const notices = await Notice.find({ category: categoryName });
  if (!notices) {
    throw HttpError(404);
  }
  res.json(notices);
};

module.exports = getNoticesByCategory;
