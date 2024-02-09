const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect.middleware");
const {
  createdUser,
  Signedin,
  changedPassword,
  logout,
  forgotPassword,
  resetPassword,
  allProperties
  
} = require("../controller/auth.controller");
const propertyController = require("../controller/properties.controller");

router.post("/signup", createdUser);
router.post("/signin", Signedin);
router.get("/logout", logout);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:token", resetPassword);
router.get("/allProperties",propertyController.allProperties);
router.use(protect);
router.patch("/PasswordUpadte", changedPassword);

module.exports = router;
