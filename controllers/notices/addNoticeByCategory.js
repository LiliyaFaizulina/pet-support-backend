const { Notice } = require("../../models/notices");

const addNoticeByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { _id: owner } = req.user;

  const result = await Notice.create({
    category: categoryName,
    owner,
    ...req.body,
  });

  res.status(201).json(result);
};

module.exports = addNoticeByCategory;
