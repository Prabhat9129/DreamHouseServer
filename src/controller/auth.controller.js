const userService = require("../services/auth.service");
const catchAsync = require("../utils/asyncFunction");
const { signToken, createSendToken } = require("../middleware/token");

const createdUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const { status, message, statusCode, data, token } =
    await userService.createUser(req);

  createSendToken(data, token, status, statusCode, message, res);
});

const Signedin = catchAsync(async (req, res) => {
  const { status, message, statusCode, data, token } = await userService.signin(
    req
  );

  createSendToken(data, token, status, statusCode, message, res);
});

const changedPassword = catchAsync(async (req, res) => {
  const { currentpassword, newpassword, conformpassword } = req.body;
  if (!currentpassword || !newpassword || !conformpassword) {
    return {
      status: "Error",
      message: "fields are Required",
      statusCode: 400,
    };
  }

  const { status, message, statusCode } = await userService.changePassword(
    currentpassword,
    newpassword,
    conformpassword,
    req.user._id
  );
  const token = signToken(req.user._id);

  createSendToken(req.user, token, status, statusCode, message, res);
});

const logout = catchAsync((req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout Successfully!",
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  console.log(req.body);
  const { status, message, statusCode } = await userService.forgotPassword(req);
  console.log(status, message);
  res.status(statusCode).json({
    status,
    message,
    statusCode,
  });
});

const resetPassword=catchAsync(async(req,res)=>{
  console.log(req.params)
  const { newpassword, conformpassword } = req.body;
  if ( !newpassword || !conformpassword) {
    res.status(400).json( {
      status: "Error",
      message: "fields are Required",
      statusCode: 400,
    });
  }
  const { status, message, statusCode,user }=await userService.resetPassword(req)

 console.log(req.user)
  const token = signToken(user._id);

  createSendToken(user, token, status, statusCode, message, res);

  }
)

module.exports = {
  createdUser,
  Signedin,
  changedPassword,
  logout,
  forgotPassword,
  resetPassword
};
