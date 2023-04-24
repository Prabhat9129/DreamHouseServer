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

const viewResident_types = asyncFunction(async (req, res) => {
  const { status, message, statusCode, data } =
    await resident_typeService.viewResident_type(req);

  // return response
  return res.status(statusCode).json({
    status,
    message,
    statusCode,
    data,
  });
});

const updatedResident_type = asyncFunction(async (req, res) => {
  const { status, message, statusCode, data } =
    await resident_typeService.updateResident_type(req);

  res.status(statusCode).json({
    status,
    message,
    statusCode,
    data,
  });
});

const deletedResident_type = asyncFunction(async (req, res) => {
  const { status, message, statusCode, data } =
    await resident_typeService.deleteResident_type(req);

  res.status(statusCode).json({
    status,
    message,
    statusCode,
    data,
  });
});

module.exports = {
  addResident_types,
  viewResident_types,
  updatedResident_type,
  deletedResident_type,
};
