const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
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
  passwordChangedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.getresetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const user = mongoose.model("User", userSchema);
module.exports = user;
