const property_typeService = require("../services/Property_type.service");
const catchAsync = require("../utils/asyncFunction");

const addProperties_type = catchAsync(async (req, res) => {
  const { status, message, statusCode, data } =
    await property_typeService.addProperty_type(req);

  res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    data: data,
  });
});

const getProperties_type = catchAsync(async (req, res) => {
  const { status, message, statusCode, data } =
    await property_typeService.viewProperty_type(req);

  res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    data: data,
  });
});

const updatedProperties_type = catchAsync(async (req, res) => {
  const { status, message, statusCode, data } =
    await property_typeService.updateProperty_type(req);

  res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    data: data,
  });
});

const deletedProperties_type = catchAsync(async (req, res) => {
  const { status, message, statusCode, data } =
    await property_typeService.deleteProperty_type(req);

  res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    data: data,
  });
});

module.exports = {
  addProperties_type,
  getProperties_type,
  updatedProperties_type,
  deletedProperties_type,
};
