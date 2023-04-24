const resident_typeModel = require("../Models/resident_type.model");
const catchAsync = require("../utils/asyncFunction");
const asyncFunction = require("../utils/asyncFunction");

const addResident_type = asyncFunction(async (body) => {
  // Destructuring body
  const { name } = body.body;

  //if name is not present
  if (!name) {
    return {
      status: "Error!",
      message: "Name is Required",
      statusCode: 400,
    };
  }

  const isName = await resident_typeModel.findOne({ name: name });

  //check if name is alredy present in collection
  if (isName) {
    return {
      status: "Error!",
      message: "Resident Type is alredy exits",
      statusCode: 409,
    };
  }
  let data = {};
  if (body.user.role === "admin") {
    data = await resident_typeModel.insertMany({
      name,
    });
  } else {
    return {
      status: "fail",
      message: "your role is not authorized for this task",
      statusCode: 401,
    };
  }

  return {
    status: "sucess",
    message: "Resident_type added successfully.",
    statusCode: 201,
    data,
  };
});

const viewResident_type = asyncFunction(async (req) => {
  //
  // console.log(req.user);
  if (req.user.role !== "admin") {
    return {
      status: "fail",
      message: "Due to your role , you can't get the data",
      statusCode: 401,
    };
  }

  const residencies = await resident_typeModel.find();

  if (!residencies) {
    return {
      status: "fail",
      message: "No Residencies!",
      statusCode: 404,
    };
  }

  return {
    status: "success",
    message: "successfully find all residencies!",
    statusCode: 200,
    data: residencies,
  };
});

const updateResident_type = asyncFunction(async (req) => {
  if (req.user.role !== "admin") {
    return {
      status: "fail",
      message: "Due to your role , you can't update the data",
      statusCode: 401,
    };
  }
  const resident = await resident_typeModel.findOne({ _id: req.params.id });

  if (!resident) {
    return {
      status: "fails!",
      message: "Resident is not available!",
      statusCode: 404,
    };
  }

  const updatedData = await resident_typeModel.findByIdAndUpdate(
    resident._id.toString(),
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );
  // console.log(updatedData);
  return {
    status: "success",
    message: "Resident Type is updated successfully!",
    statusCode: 200,
    data: updatedData,
  };
});

const deleteResident_type = asyncFunction(async (req) => {
  if (req.user.role !== "admin") {
    return {
      status: "fail",
      message: "Due to your role , you can't update the data",
      statusCode: 401,
    };
  }
  const resident = await resident_typeModel.findOne({ _id: req.params.id });

  if (!resident) {
    return {
      status: "fails!",
      message: "Resident is not available!",
      statusCode: 404,
    };
  }

  const deletedata = await resident_typeModel.findByIdAndDelete({
    _id: resident._id.toString(),
  });

  return {
    status: "success",
    message: "Resident Type is deleted successfully!",
    statusCode: 200,
    data: deletedata,
  };
});

module.exports = {
  addResident_type,
  viewResident_type,
  updateResident_type,
  deleteResident_type,
};
