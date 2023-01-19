const { Pet } = require("../../models/pets");
const { HttpError } = require("../../helpers");

const removePetById = async (req, res) => {
  const { id } = req.params;

  const { _id: owner } = req.user;

  const result = await Pet.findOneAndRemove({ _id: id, owner });
  // const result = await Pet.findOneAndRemove({ owner });
  if (!result) {
    throw HttpError(404, "Pet not found");
  }

  res.json({
    message: "pet deleted",
    result,
  });
};

module.exports = removePetById;
