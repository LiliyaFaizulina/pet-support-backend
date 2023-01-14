const New = require("../../models/new");

const { HttpError, ctrlWrapper } = require("../../helpers");

const getAllNews = async (req, res) => {
  const news = await New.find();
  if (!news) {
    throw HttpError(404, error.message);
  }
  res.json({ news });
};

module.exports = {
  getAllNews: ctrlWrapper(getAllNews),
};
