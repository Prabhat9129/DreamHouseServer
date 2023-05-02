const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "src/config/config.env" });

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, utoken, status, statusCode, message, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", utoken, cookieOptions);

  // Remove password from output

  // user.password = undefined;

  res.status(statusCode).json({
    status,
    statusCode,
    message,
    utoken,
    user,
  });
};
module.exports = { signToken, createSendToken };
