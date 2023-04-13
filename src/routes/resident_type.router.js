const express = require("express");
const router = express.Router();
const { addResident_types } = require("../controller/resident_type.controller");

router.post("/Resident_type", addResident_types);

module.exports = router;
