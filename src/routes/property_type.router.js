const express = require("express");
const router = express.Router();
const {
  addProperties_type,
  getProperties_type,
  updatedProperties_type,
  deletedProperties_type,
} = require("../controller/property_type.controller");

router.post("/addProperty_type", addProperties_type);
router.get("/getProperty_type", getProperties_type);
router.patch("/updateProperty_type/:id", updatedProperties_type);
router.delete("/deleteProperty_type/:id", deletedProperties_type);

module.exports = router;
