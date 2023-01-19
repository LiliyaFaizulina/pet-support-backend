const { Pet } = require("../../models/pets");

const getUser = async (req, res) => {
  const {
    name,
    email,
    avatarURL,
    birthday,
    city,
    phone,
    favoriteNotices,
    _id,
  } = req.user;

  const pets = await Pet.find({ owner: _id }, "-createdAt -updatedAt -owner");
  res.json({
    message: "success",
    user: {
      _id,
      name,
      email,
      avatarURL,
      birthday,
      city,
      phone,
      favoriteNotices,
    },
    pets,
  });
};

module.exports = getUser;
