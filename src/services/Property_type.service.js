const propertyModel = require("../Models/property_type.model");
const catchAsync = require("../utils/asyncFunction");

const addProperty = catchAsync(async (body) => {
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
  console.log(isName);
  if (isName) {
    return {
      status: "error",
      message: "Name is alredy exist!",
      statusCode: 409,
    };
  }

  //save data
  const data = await propertyModel.insertMany({
    name,
  });

  return {
    status: "success",
    message: "property_type added successfully",
    statusCode: 201,
    data,
  };
});

module.exports = { addProperty };
