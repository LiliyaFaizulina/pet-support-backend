const { User } = require("../../models/user");
const { ObjectId } = require("mongodb");

const addFavorite = async (req, res) => {
  const { _id } = req.user;
  const { notice_id } = req.query;
  const newId = new ObjectId(notice_id);

  const user = await User.findByIdAndUpdate(
    { _id },
    { $push: { favoriteNoticeId: newId } }
  );

  res.status(201).json({
    message: "success",
  });
};

module.exports = addFavorite;
