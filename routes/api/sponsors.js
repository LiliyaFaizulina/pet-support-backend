const express = require("express");
const ctrl = require("../../controllers/sponsors");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllSponsors));
module.exports = router;
