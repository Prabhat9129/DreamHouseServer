const express = require("express");
const router = express.Router();
const {
  addProperties_type,
} = require("../controller/property_type.controller");

router.post("/addProperty_type", addProperties_type);

module.exports = router;
