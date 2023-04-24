const userModel = require("../Models/user.model");
const catchAsync = require("../utils/asyncFunction");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { signToken } = require("../middleware/token");
const { sendEmail } = require("../utils/sendEmail");

const createUser = catchAsync(async (req) => {
  //Destructuring body
  console.log(req.body);
  let { name, email, password, role } = req.body;
  let { number, gender, city_id, address, pincode } = req.body;

  //assign null if field is not required
  if (!number) number = "";
  if (!gender) gender = "";
  if (!city_id) city_id = "";
  if (!address) address = "";
  if (!pincode) pincode = "";

  //check all required field have value or not
  if (!name || !email || !password || !role) {
    return {
      status: "Error",
      message: "Fields are Required",
      statusCode: 400,
    };
  }

  //check valid password or not
  if (password.length < 8) {
    return {
      status: "Error",
      message: "PasswordLength must be greater than 8 character",
      statusCode: 400,
    };
  }

  //check is email is there in collection
  const isEmailTaken = await userModel.findOne({ email: email });

  if (isEmailTaken) {
    return {
      status: "Error",
      message: "Email is alredy exits!",
      statusCode: 409,
    };
  }

  //password decrption
  const salt = await bcrypt.genSalt();
  password = bcrypt.hashSync(password, salt);
  // console.log(password);

  //save data
  const newUser = await userModel.create({
    name,
    email,
    password,
    role,
    number,
    gender,
    city_id,
    address,
    pincode,
  });
  console.log(newUser);
  // Generate token
  const token = signToken(newUser._id);

  // Remove password from output
  newUser.password = undefined;

  //send response
  return {
    status: "Success",
    message: "user register successfully",
    statusCode: 201,
    data: newUser,
    token,
  };
});

const signin = catchAsync(async (body) => {
  //Destructuring body
  const { email, password } = body.body;

  //check if email and password is not exist
  if (!email || !password) {
    return {
      status: "Error",
      message: "Email and Password are Required",
      statusCode: 400,
    };
  }

  //check user there in collection
  const userData = await userModel.findOne({ email: email });

  //if user not exist in collection
  if (!userData) {
    return {
      status: "Error",
      message: "Please provide correct Email and Password",
      statusCode: 401,
    };
  }

  //compare password
  const cPass = bcrypt.compareSync(password, userData.password);

  //check for correct password
  if (!cPass) {
    return {
      status: "Error",
      message: "Please provide correct Password",
      statusCode: 401,
    };
  }

  // Generate token
  const token = signToken(userData._id);

  // set password undefined
  userData.password = undefined;

  //send response
  return {
    status: "Success",
    message: "user login successfully",
    statusCode: 200,
    data: userData,
    token,
  };
});

const changePassword = catchAsync(
  async (currPass, newPass, passConformation, userId) => {
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return {
        status: "fails",
        message: "user not find",
        statusCode: 404,
      };
    }

    // compare password
    const comp = await bcrypt.compareSync(currPass, user.password);
    if (!comp) {
      return {
        status: "fails",
        message: "Please provide correct current password!",
        statusCode: 400,
      };
    }

    // check new password and conform password are same or not
    if (newPass !== passConformation) {
      return {
        status: "fails",
        message: "password and conform password must be same! ",
        statusCode: 400,
      };
    }

    // update password in document
    const salt = await bcrypt.genSalt();
    newPassword = bcrypt.hashSync(newPass, salt);
    user.password = newPassword;
    await user.save();

    return {
      status: "success",
      message: "Password updated successfully!",
      statusCode: 200,
    };
  }
);

const forgotPassword = catchAsync(async (body) => {
  // find into database
  const user = userModel.findOne({ email: body.email });

  //
  if (!user) {
    return {
      status: "fail!",
      message: "There is no user with this email address!",
      statusCode: 404,
    };
  }

  // const resetToken = crypto.randomBytes(20).toString("hex");
  // userModel.resetPasswordToken = crypto
  //   .createHash("sha256")
  //   .update(resetToken)
  //   .digest("hex");
  // userModel.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  // // await userModel.save({ validateBeforeSave: false });
  // const resetUrl = `${body.protocol}://${body.get(
  //   "host"
  // )}/app/resetpassword${resetToken}`;
  // const message = `your reset password url is here ${resetUrl}`;

  // try {
  //   await sendEmail({
  //     email: user.email,
  //     subject: "password recovery",
  //     message,
  //   });
  //   return {
  //     status: true,
  //     message: `email sent to ${user.email} successfuly`,
  //     statusCode: 404,
  //   };
  //   // res.status(200).json({
  //   //   success: true,
  //   //   message: `email sent to ${user.email} successfuly`,
  //   // });
  // } catch (error) {
  //   // (userModel.resetPasswordToken = undefined),
  //   //   (userModel.resetPasswordExpire = undefined),
  //   //   await userModel.save({ validateBeforeSave: false });
  //   return {
  //     status: "error",
  //     message: error.message,
  //     statusCode: 500,
  //   };
  //   // next(new Errorhandler(error.message, 500));
  // }
});

module.exports = { createUser, signin, changePassword, forgotPassword };
// const token = crypto.randomBytes(20).toString("hex");

// user.resetPasswordToken = token;
// user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
// await user.save();

// const resetUrl = `http://${req.headers.host}/resetPassword/${token}`;

// const message = {
//   to: user.email,
//   subject: "Password Reset Request",
//   html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
// };

//   await mailService.send(message)
//   return res.status(200).json({ message: 'Password reset email sent' });
// });

//   Generate the random reset token
