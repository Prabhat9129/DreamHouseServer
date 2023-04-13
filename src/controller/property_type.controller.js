const property_typeService = require("../services/Property_type.service");
const catchAsync = require("../utils/asyncFunction");

const addProperty_type = catchAsync(async (req, res) => {
  const { status, message, statusCode, data } =
    await property_typeService.addProperty(req);

  res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    data: data,
  });
});

module.exports = { addProperty_type };
