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
  const { query } = req;
  const { _id: owner } = req.user;
  const pets = await Pet.find(
    { owner, ...query },
    "-createdAt -updatedAt -owner"
  ).populate("owner"); // все данные про юсера в каждого пета, зачем?
  res.json({
    message: "success",

    data: {
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
  });
};

module.exports = getUser;
