const { Pet } = require("../../models/pets");

const getUser = async (req, res) => {
  const {
    name,
    email,
    avatar,
    birthday,
    city,
    phone,
    _id: owner,
  } = req.user;
  
  const pets = await Pet.find(
    { owner },
    "-createdAt -updatedAt -owner"
  ); 
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
    },
  });
};

module.exports = getUser;
