const propertyService = require("../services/properties.service");
const catchAsync = require("../utils/asyncFunction");

const propertyAdded = catchAsync(async (req, res) => {
  // Destructring data
  const { status, message, statusCode, data } =
    await propertyService.addProperty(req);

  // send response
  return res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    data,
  });
});

module.exports = { propertyAdded };
