const mongoose = require("mongoose");
const propertySchma = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    require: [true, "User id is required"],
  },
  title: { type: String, require: [true, "Property Title is required!"] },
  description: {
    type: String,
    require: [true, "Descrption about property is required!"],
  },
  status: { type: String, require: [true, "Status is require!"] },
  type: {
    type: mongoose.Types.ObjectId,
    require: [true, "Please provide property Type!"],
  },
  //   city_id: {},
  resident_type_id: {
    type: mongoose.Types.ObjectId,
    require: [true, "Please provide resident Type ID!"],
  },
  price: {
    type: Number,
    require: [true, "what is the price of your property!"],
  },
  size: { type: String, require: [true, "tell your property size!"] },
  //   Area: {},
  profile: { type: String },
  allowance: { type: Boolean },
});

const property = mongoose.model("Property", propertySchma);
module.exports = property;
