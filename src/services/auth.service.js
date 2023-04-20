const userModel = require("../Models/user.model");
const catchAsync = require("../utils/asyncFunction");
const bcrypt = require("bcrypt");
const { signToken } = require("../middleware/token");

const createUser = catchAsync(async (body) => {
  //Destructuring body
  let { name, email, password, role } = body.body;
  let { number, gender, city_id, address, pincode } = body.body;

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
  const newUser = await userModel.insertMany({
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
  console.log(token);
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

module.exports = { createUser, signin, changePassword };
