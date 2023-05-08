const userModel = require("../Models/user.model");
const catchAsync = require("../utils/asyncFunction");
const crypto=require("crypto");
const bcrypt = require("bcrypt");
const AppError=require("../utils/appError")

const { signToken } = require("../middleware/token");
const  sendEmail  = require("../utils/sendEmail");

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

const signin = catchAsync(async (req) => {
  //Destructuring body
  const { email, password } = req.body;

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

const forgotPassword = catchAsync(async (req) => {
  // find into database
  console.log(req.body.email)
  const {email}=req.body
  const user =await userModel.findOne({ email: email });
console.log(user);
  
  if (!user) {
    return {
      status: "Error",
      message: "There is no user with this email address!",
      statusCode: 404,
    }
  };

    // 2- Generate the random reset token
    
  const resetToken = user.getresetPasswordToken();
  await user.save();

   // 3- Send it to user's email
   const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.
  \nIf you didn't forget your password, please ignore this email!`;

  try {
   await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    return {
      status: "success!",
      message: "Token sent to email!",
      statusCode: 200,
    };
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return{
      status: "Error!",
      message: "There was an error sending the email. Try again later!",
      statusCode: 500
    }
  }
});

const resetPassword=catchAsync(async(req)=>{
  // 1- Get user based on the token
  console.log(req.params.token)
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await userModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  console.log(user)
 
  // 2- If token has not expired, and there is user, set the new password
  if (!user) {
    return {
      status: "Error",
      message: "Token is invalid or has expired",
      statusCode: 400,
    }
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3- Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT

  return {
    status:'success',
    message:'Reset password successfully',
    statusCode:200,
    user
  }
 
})

module.exports = { createUser, signin, changePassword, forgotPassword,resetPassword };
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");

const { signToken } = require("../middleware/token");
const sendEmail = require("../utils/sendEmail");

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
      message: "PasswordLength must be Greater  or Equal to 8 character",
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

/**
 * @desc    Sign In Service
 * @param   { String } email - User email address
 * @param   { String } password - User password
 * @return  { Object<type|statusCode|message|user|tokens> }
 */
const signin = catchAsync(async (req) => {
  //Destructuring body
  const { email, password } = req.body;

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

const forgotPassword = catchAsync(async (req) => {
  // find into database
  console.log(req.body.email);
  const { email } = req.body;
  const user = await userModel.findOne({ email: email });
  console.log(user);

  if (!user) {
    return {
      status: "Error",
      message: "There is no user with this email address!",
      statusCode: 404,
    };
  }

  // 2- Generate the random reset token

  const resetToken = user.getresetPasswordToken();
  await user.save();

  // 3- Send it to user's email
  const resetURL = `http://localhost:4200/resetpassword/${resetToken}`;
  console.log(resetURL);
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.
  \nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    return {
      status: "success!",
      message: "Token sent to email!",
      statusCode: 200,
    };
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return {
      status: "Error!",
      message: "There was an error sending the email. Try again later!",
      statusCode: 500,
    };
  }
});

const resetPassword = catchAsync(async (req) => {
  // 1- Get user based on the token
  console.log(req.params.token);
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  console.log(user);

  // 2- If token has not expired, and there is user, set the new password
  if (!user) {
    return {
      status: "Error",
      message: "Token is invalid or has expired",
      statusCode: 400,
    };
  }

  console.log(req.body);
  user.password = req.body.newpassword;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  return {
    status: "success",
    message: "Reset password successfully",
    statusCode: 200,
    user,
  };
});

module.exports = {
  createUser,
  signin,
  changePassword,
  forgotPassword,
  resetPassword,
  updateProfile,
};
