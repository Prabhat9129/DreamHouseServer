const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect.middleware");
const { createdUser, Signedin } = require("../controller/auth.controller");

router.post("/signup", createdUser);
router.post("/signin", Signedin);

router.use(protect);
// router.patch();
module.exports = router;
