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

module.exports = { addProperties_type };
