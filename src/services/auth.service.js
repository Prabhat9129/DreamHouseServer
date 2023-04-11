const userModel = require("../Models/user.model");
const catchAsync = require("../utils/asyncFunction");

const createUser = catchAsync(async (body) => {
  //Destructuring body
  const { name, email, password, role } = body.body;
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

  return {
    status: "Success",
    message: "user register successfully",
    statusCode: 201,
    data: newUser,
  };
});

module.exports = { createUser };
