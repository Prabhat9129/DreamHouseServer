const express = require("express");
const router = express.Router();
const {
  addResident_types,
  viewResident_types,
  updatedResident_type,
  deletedResident_type,
} = require("../controller/resident_type.controller");

router.post("/Resident_type", addResident_types);
router.get("/getResident_type", viewResident_types);
router.patch("/updateResident_type/:id", updatedResident_type);
router.delete("/deleteResident_type/:id", deletedResident_type);

module.exports = router;
