const ctrlWrapper = require("../../helpers/ctrlWrapper");
const addPet = require("./addPet");
const getUser = require("./getUser");
const removePetById = require("./removePetById");
const updateUser = require("./updateUser");

module.exports = {
  addPet: ctrlWrapper(addPet),
  getUser: ctrlWrapper(getUser),
  removePetById: ctrlWrapper(removePetById),
  updateUser: ctrlWrapper(updateUser),
};
