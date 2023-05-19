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
  if (!header) {
    return next(
      new appError("you have not Authorization Please set first ", 401)
    );
  }
  const token = header.split(" ")[1];

  // check if token doesn't exists
  if (!token) {
    return next(
      new appError("you are not logged in, Please logged in first ", 401)
    );
  }

  //Token verification

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //extract user data from collection
  const currUser = await userModel.findOne({ _id: decode.id });

  // check if user doesn't exists
  if (!currUser) {
    return next(new appError(`user doesn't exists related to this token`, 401));
  }
  currUser.password = undefined;
  req.user = currUser;

  next();
});

module.exports = protect;
