const express = require("express");
const router = express.Router();
const propertyController = require("../controller/properties.controller");

router.post("/property", propertyController.propertyAdded);

module.exports = router;
