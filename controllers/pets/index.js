const ctrlWrapper = require("../../helpers/ctrlWrapper");
const addPet = require("./addPet");
const removePetById = require("./removePetById");

module.exports = {
  addPet: ctrlWrapper(addPet),
  removePetById: ctrlWrapper(removePetById),
};
