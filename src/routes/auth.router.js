const express = require("express");
const router = express.Router();
const { createdUser, Signedin } = require("../controller/auth.controller");

router.post("/signup", createdUser);
router.post("/signin", Signedin);

module.exports = router;
