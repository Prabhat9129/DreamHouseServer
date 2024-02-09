const express = require("express");
const router = express.Router();
const propertyController = require("../controller/properties.controller");

router.post("/property", propertyController.addProperties);
router.get("/property/:id", propertyController.findProperty);
router.patch("/property/:id", propertyController.allowedproperty);
router.post("/booking", propertyController.book);
router.get("/allbooking", propertyController.allbooking);

module.exports = router;