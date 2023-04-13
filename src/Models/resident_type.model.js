const mongoose = require("mongoose");
const resident_typeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: [true, "Please provide your name!"],
  },
});

const resident_model = mongoose.model("resident", resident_typeSchema);
module.exports = resident_model;
