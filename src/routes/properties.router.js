const express = require("express");
const router = express.Router();
const propertyController = require("../controller/properties.controller");

router.post("/property", propertyController.propertyAdded);
router.get("/countrystate", propertyController.countryState);
module.exports = router;
