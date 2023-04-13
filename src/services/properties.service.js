const catchAsync = require("../utils/asyncFunction");
const propertiesModel = require("../Models/property.model");
const userModel = require("../Models/user.model");
const properties_typeModel = require("../Models/property_type.model");
const resident_typeModel = require("../Models/resident_type.model");

const addProperty = catchAsync(async (body) => {
  const { userName, properties_typeName, resident_typeName, price, size } =
    body;
  let { status, profile, allowance } = body;

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

  const Isuser = userModel.findOne({ name: userName });
  const Isproperties_typename = properties_typeModel.findOne({
    name: properties_typeName,
  });
  const Isresident_typeName = resident_typeModel.findOne({
    name: resident_typeName,
  });
});
