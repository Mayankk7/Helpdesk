const express = require("express");

const router = express.Router();

const {getMessage, getIndex} = require("../controllers/Routes")

router.get("/", getIndex);

router.post("/receive", getMessage)

module.exports = router;