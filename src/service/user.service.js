const userModel = require("../Model/user.model");
const asyncFunction = require("../utils/asyncFunction");

const createUser = asyncFunction(async (body) => {
  const { name, email, password, role } = body;
  let { number, gender, city_id, address, pincode } = body;

  if (!number) number = "";
  if (!gender) gender = "";
  if (!city_id) city_id = "";
  if (!address) address = "";
  if (!pincode) pincode = "";

  if (!name || !email || !password || !role) {
    return {
      status: "Error",
      message: "Fields are Required",
      statusCode: 400,
    };
  }

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
    status: "success",
    message: "user register successfully",
    statusCode: 201,
    newUser,
  };
});

module.exports = { createUser };
