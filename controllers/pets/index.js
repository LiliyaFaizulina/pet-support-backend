const ctrlWrapper = require("../../helpers/ctrlWrapper");
const addPet = require("./addPet");
const getUser = require("./getUser");
const removePetById = require("./removePetById");

module.exports = {
  addPet: ctrlWrapper(addPet),
  getUser: ctrlWrapper(getUser),
  removePetById: ctrlWrapper(removePetById),
 
};
