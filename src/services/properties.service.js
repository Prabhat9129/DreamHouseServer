const catchAsync = require("../utils/asyncFunction");
const propertiesModel = require("../Models/property.model");
const properties_typeModel = require("../Models/property_type.model");
const resident_typeModel = require("../Models/resident_type.model");

const addProperty = catchAsync(async (body) => {
  //Destructing body
  const { userName, properties_typeName, resident_typeName, price, size } =
    await body.body;
  let { status, profile, allowance } = body;

  //field are require
  if (
    !userName ||
    !properties_typeName ||
    !resident_typeName ||
    !price ||
    !size
  ) {
    return {
      status: "Error",
      message: "All fields are required!",
      statusCode: 400,
    };
  }
  // properties_type;

  const Isproperties_typename = await properties_typeModel.findOne({
    name: properties_typeName,
  });
  if (!Isproperties_typename) {
    return {
      status: "Error",
      message: "Property_type name is Invalid!",
      statusCode: 400,
    };
  }

  //Resident_Type
  const Isresident_typeName = await resident_typeModel.findOne({
    name: resident_typeName,
  });

  if (!Isresident_typeName) {
    return {
      status: "Error",
      message: "Resident_type name is Invalid!",
      statusCode: 400,
    };
  }

  //Insert Into collection
  let data = {};
  if (body.user.role === "seller") {
    data = await propertiesModel.insertMany({
      user_id: body.user._id,
      properties_type_id: Isproperties_typename._id,
      resident_type_id: Isresident_typeName._id,
      price: price,
      size: size,
      // status: status,
      // profile: profile,
      // allowance: true,
    });
  } else {
    return {
      status: "fail",
      message: "your role is not authorized for this task!",
      statusCode: 401,
      data: data,
    };
  }

  // return data
  return {
    status: "success",
    message: "Properties Added successfully!",
    statusCode: 201,
    data: data,
  };
});

module.exports = { addProperty };
