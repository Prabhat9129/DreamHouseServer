const mongoose = require("mongoose");
const validator = require("validator");
const booking = new mongoose.Schema({
  property_id: {
    type: mongoose.Types.ObjectId,
    require: [true, "Please provide Property ID"],
  },
  buyer_id:{
    type: mongoose.Types.ObjectId,
    require: [true, "Please provide Buyer ID"],
  },
  seller_id:{
    type: mongoose.Types.ObjectId,
    require: [true, "Please provide seller ID"],
  },
  message: { type: String , require: [true, "Please provide message"],},
});

const booking_model = mongoose.model("booking", booking);
module.exports = booking_model;
