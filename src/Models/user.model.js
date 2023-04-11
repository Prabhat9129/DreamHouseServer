const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide your name!"],
  },

  email: {
    type: String,
    require: [true, "Please provide your Email!"],
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },

  password: {
    type: String,
    require: [true, "Please provide a strong password"],
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error(
          "Password must contain at least one letter and one number"
        );
      }
    },
  },

  role: { type: String, enum: ["buyer", "admin", "seller"], default: "buyer" },
  number: { type: Number },
  gender: { type: String },
  profileImg: { type: String },
  city_id: { type: String },
  address: { type: String },
  pincode: { type: Number },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
