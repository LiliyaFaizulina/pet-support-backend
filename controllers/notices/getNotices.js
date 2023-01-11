const { Notice } = require("../../models/notices");
const { HttpError } = require("../../helpers/HttpError");

const getNotices = async (req, res) => {
  const list = await Notice.find();
  if (!list) {
    throw HttpError(404);
  }
  res.json(list);
};

module.exports = getNotices;
