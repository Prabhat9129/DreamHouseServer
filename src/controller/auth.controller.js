const userService = require("../services/auth.service");
const catchAsync = require("../utils/asyncFunction");
const { createSendToken } = require("../middleware/token");

const createdUser = catchAsync(async (req, res) => {
  const { status, message, statusCode, data, token } =
    await userService.createUser(req);

  createSendToken(data, token, status, statusCode, message, res);
});

const Signedin = catchAsync(async (req, res) => {
  const { status, message, statusCode, data, token } = await userService.signin(
    req
  );
  console.log(status, message, statusCode, data, token);
  createSendToken(data, token, status, statusCode, message, res);
});

const changedPassword = catchAsync(async (req, res) => {
  const { currPass, newPass, passConformation } = req.body;
  if (!currPass || !newPass || !passConformation) {
    return {
      status: "Error",
      message: "fields are Required",
      statusCode: 400,
    };
  }
  console.log(req.user);
  const { status, message, statusCode } = await userService.changePassword(
    currPass,
    newPass,
    passConformation,
    req.user._id
  );

  return res.status(statusCode).json({
    status,
    message: message,
    statusCode,
  });
});

const logout = catchAsync((req, res) => {
  console.log(new Date(Date.now()));
  res.cookie("token", null, {
    expires: new Date(Date.now() - 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
});
module.exports = { createdUser, Signedin, changedPassword, logout };
