const { Pet } = require("../../models/pets");

const getUser = async (req, res) => {
  const {
    name,
    email,
    avatar,
    birthday,
    city,
    phone,
    notieceId,
    favoriteNoticeId,
  } = req.user;
  const { query } = req.query;
  const { _id: owner } = req.user;
  const pets = await Pet.find(
    { owner, ...query },
    "-createdAt -updatedAt -owner"
  ).populate("owner");
  res.json({
    message: "success",
    data: {
      result: {
        name,
        email,
        avatar,
        birthday,
        city,
        phone,
        pets,
        notieceId,
        favoriteNoticeId,
      },
    },
  });
};

module.exports = getUser;
