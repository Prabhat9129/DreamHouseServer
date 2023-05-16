const mongoose = require("mongoose");
const validator = require("validator");
const contact = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: [true, "Please provide your name!"],
  },
  email: {
    type: String,
    require: [true, "Please provide your email"],
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  number: { type: Number, require: [true, "Please provide Number"] },
  reference: { type: String },
  message: { type: String },
});

const contact_model = mongoose.model("contact", contact);
module.exports = contact_model;
