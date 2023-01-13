const {Sponsor} = require("../../models/sponsors/sponsors");

const getAllSponsors = async (req, res, next) => {
  const result = await Sponsor.find()
  res.json(result)
};

module.exports = getAllSponsors;
