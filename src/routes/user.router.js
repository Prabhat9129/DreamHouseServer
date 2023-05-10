const express = require("express");
const router = express.Router();
const { updateProfiles } = require("../controller/user.controller");

router.patch("/updateprofile", updateProfiles);
module.exports = router;
