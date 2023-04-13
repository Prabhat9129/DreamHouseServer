const mongoose = require("mongoose");
const propertySchma = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    require: [true, "User id is required"],
  },
  //   society_id: {},
  properties_type_id: {
    type: mongoose.Types.ObjectId,
    require: [true, "Please provide property Type id!"],
  },
  //   city_id: {},
  resident_type: {
    type: mongoose.Types.ObjectId,
    require: [true, "Please provide resident Type ID!"],
  },
  price: {
    type: Number,
    require: [true, "what is the price of your property!"],
  },
  size: { type: String, require: [true, "tell your property size!"] },
  status: { type: String },
  //   Area: {},
  profile: { type: String },
  allowance: { type: String },
});

const property = mongoose.model("Property", propertySchma);
module.exports = property;
