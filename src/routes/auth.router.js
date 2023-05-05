const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect.middleware");
const {
  createdUser,
  Signedin,
  changedPassword,
  logout,
  forgotPassword,
  resetPassword
} = require("../controller/auth.controller");

router.post("/signup", createdUser);
router.post("/signin", Signedin);
router.get("/logout", logout);
router.patch("/resetpassword/:token", resetPassword);

router.use(protect);
router.patch("/PasswordUpadte", changedPassword);
router.post("/forgotpassword", forgotPassword);


module.exports = router;
