const resident_typeService = require("../services/resident_type.service");
const asyncFunction = require("../utils/asyncFunction");

const addResident_types = asyncFunction(async (req, res) => {
  //call addResident_type from service
  const { status, message, statusCode, data } =
    await resident_typeService.addResident_type(req);

  //return response
  return res.status(statusCode).json({
    status,
    message,
    statusCode,
    data,
  });
});

module.exports = { addResident_types };
