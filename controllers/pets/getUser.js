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
    _id: owner,
  } = req.user;

  const pets = await Pet.find({ owner }, "-createdAt -updatedAt -owner");
  res.json({
    message: "success",
    user: {
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
