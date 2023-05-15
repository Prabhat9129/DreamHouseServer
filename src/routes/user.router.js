const express = require("express");
const router = express.Router();
const { updateProfiles,getUsers } = require("../controller/user.controller");

router.patch("/updateprofile", updateProfiles);
router.get("/getuser", getUsers);
module.exports = router;
