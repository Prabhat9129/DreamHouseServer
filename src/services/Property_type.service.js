const propertyModel = require("../Models/property_type.model");
const catchAsync = require("../utils/asyncFunction");

const addProperty_type = catchAsync(async (body) => {
  //destructuring body
  const { name } = body.body;

  // check value input or not
  if (!name) {
    return {
      status: "error",
      message: "please provide required details!",
      statusCode: 400,
    };
  }

  //check into collaction
  const isName = await propertyModel.findOne({ name: name });

  if (isName) {
    return {
      status: "error",
      message: "Name is alredy exist!",
      statusCode: 409,
    };
  }

  //save data
  let data = {};
  if (body.user.role === "admin") {
    data = await propertyModel.insertMany({
      name,
    });
  } else {
    return {
      status: "fail",
      message: "your role is not authorized for this task",
      statusCode: 401,
      data,
    };
  }
  return {
    status: "success",
    message: "property_type added successfully",
    statusCode: 201,
    data,
  };
});

module.exports = { addProperty_type };
