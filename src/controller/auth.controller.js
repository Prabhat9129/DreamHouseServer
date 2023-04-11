const userService = require("../services/auth.service");
const catchAsync = require("../utils/asyncFunction");

const createdUser = catchAsync(async (req, res) => {
  const { status, message, statusCode, data } = await userService.createUser(
    req
  );

  return res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    data,
  });
});

module.exports = { createdUser };
