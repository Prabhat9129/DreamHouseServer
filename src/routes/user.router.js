const express = require("express");
const router = express.Router();
const { updateProfiles,getUsers,findAll} = require("../controller/user.controller");

router.patch("/updateprofile", updateProfiles);
router.get("/getuser", getUsers);
router.get("/getalluser", findAll);
module.exports = router;
