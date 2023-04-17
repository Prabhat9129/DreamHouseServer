// packages
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// config
dotenv.config({ path: "src/config/config.env" });

//utils
const catchAsync = require("../utils/asyncFunction");
const appError = require("../utils/appError");

//Models
const userModel = require("../Models/user.model");

const protect = catchAsync(async (req, res, next) => {
  //Getting the token
  const header = req.header("Authorization");
  console.log(header.split(" ")[1]);
  const token = header.split(" ")[1];

  // check if token doesn't exists
  if (!token) {
    return next(
      new appError("you are not logged in, Please logged in first ", 401)
    );
  }

  //Token verification

  const decode = await promisify(jwt.verify)(token, process.env.secret);

  //extract user data from collection
  const currUser = await userModel.findOne({ _id: decode._id });

  // check if user doesn't exists
  if (!user) {
    return next(new appError(`user doesn't exists related to this token`, 401));
  }

  req.user = currUser;
  next();
});

module.exports = protect;
