const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "src/config/config.env" });

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user,
  utoken,
  status,
  statusCode,
  message,
  req,
  res
) => {
  const token = utoken;

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status,
    message,
    token,
    data: {
      user,
    },
  });
};
module.exports = { signToken, createSendToken };
