const { updateProfile } = require("../services/user.service");
const catchAsync = require("../utils/asyncFunction");

const updateProfiles = catchAsync(async (req, res) => {
  console.log(req.body);
  const { status, statusCode, message, updatedata } = await updateProfile(req);
  res.status(statusCode).json({
    status: status,
    message: message,
    statusCode: statusCode,
    updatedata,
  });
});

module.exports = { updateProfiles };
