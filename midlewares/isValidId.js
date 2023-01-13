const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { petsId } = req.params;
  const result = isValidObjectId(petsId);

  if (!result) {
    throw HttpError(404, `${petsId} is not valid id`);
  }

  next();
};

module.exports = isValidId;
