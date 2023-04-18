const userService = require("../services/auth.service");
const catchAsync = require("../utils/asyncFunction");

const createdUser = catchAsync(async (req, res) => {
  const { status, message, statusCode, data, token } =
    await userService.createUser(req);

  return res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    data,
    token,
  });
});

const Signedin = catchAsync(async (req, res) => {
  const { status, message, statusCode, data, token } = await userService.signin(
    req
  );

  return res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    data,
    token,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { currPass, newPass, passConformation } = req.body;
  if (!currPass || !newPass || !passConformation) {
    return {
      status: "Error",
      message: "fields are Required",
      statusCode: 400,
    };
  }
  const { status, message, statusCode, data, token } =
    await userService.changePassword(
      currPass,
      newPass,
      passConformation,
      req.user._id
    );

  return res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    data,
    token,
  });
});
module.exports = { createdUser, Signedin, changePassword };
