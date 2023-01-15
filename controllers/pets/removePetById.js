const { Pet } = require("../../models/pets");
const { HttpError } = require("../../helpers");

const removePetById = async (req, res) => {
  const { petsId } = req.params;
  const { _id: owner } = req.user;

  const result = await Pet.findOneAndRemove({ _id: petsId, owner });
  if (!result) {
    throw HttpError(404, "Pet not found");
  }

  res.json({
    message: "pet deleted",
    data: { result },
  });
};

module.exports = removePetById;
