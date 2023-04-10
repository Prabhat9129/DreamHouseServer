const express = require("express");
const router = express.Router();
const { createdUser } = require("../controller/user.controller");

router.post("/signup", createdUser);

module.exports = router;
