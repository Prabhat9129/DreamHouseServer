const express = require("express");
const router = express.Router();
const { addProperty_type } = require("../controller/property_type.controller");

router.post("/addProperty_type", addProperty_type);

module.exports = router;
