const express = require("express");
const ctrl = require("../../controllers/news/getAllNews");

const router = express.Router();

router.get("/", ctrl.getAllNews);

module.exports = router;
