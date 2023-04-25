const property_typeModel = require("../Models/property_type.model");
const catchAsync = require("../utils/asyncFunction");

const addProperty_type = catchAsync(async (body) => {
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
  const isName = await property_typeModel.findOne({ name: name });

  if (isName) {
    return {
      status: "error",
      message: "Name is alredy exist!",
      statusCode: 409,
    };
  }

  //save data
  let data = {};
  if (body.user.role === "admin") {
    data = await property_typeModel.insertMany({
      name,
    });
  } else {
    return {
      status: "fail",
      message: "your role is not authorized for this task",
      statusCode: 401,
      data,
    };
  }
  return {
    status: "success",
    message: "property_type added successfully",
    statusCode: 201,
    data,
  };
});

const viewProperty_type = catchAsync(async (req) => {
  //
  // console.log(req.user);
  if (req.user.role !== "admin") {
    return {
      status: "fail",
      message: "Due to your role , you can't get the data",
      statusCode: 401,
    };
  }

  const properties = await property_typeModel.find();

  if (!properties) {
    return {
      status: "fail",
      message: "No Properties!",
      statusCode: 404,
    };
  }

  return {
    status: "success",
    message: "successfully find all Properties!",
    statusCode: 200,
    data: properties,
  };
});

const updateProperty_type = catchAsync(async (req) => {
  if (req.user.role !== "admin") {
    return {
      status: "fail",
      message: "Due to your role , you can't update the data",
      statusCode: 401,
    };
  }
  const property = await property_typeModel.findOne({ _id: req.params.id });

  if (!property) {
    return {
      status: "fails!",
      message: "Property Type is not available!",
      statusCode: 404,
    };
  }

  const updatedData = await property_typeModel.findByIdAndUpdate(
    property._id.toString(),
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
    message: "Property Type is updated successfully!",
    statusCode: 200,
    data: updatedData,
  };
});

const deleteProperty_type = catchAsync(async (req) => {
  if (req.user.role !== "admin") {
    return {
      status: "fail",
      message: "Due to your role , you can't delete the data",
      statusCode: 401,
    };
  }
  const property = await property_typeModel.findOne({ _id: req.params.id });

  if (!property) {
    return {
      status: "fails!",
      message: "Property is not available!",
      statusCode: 404,
    };
  }

  const deletedata = await property_typeModel.findByIdAndDelete({
    _id: property._id.toString(),
  });

  return {
    status: "success",
    message: "Property Type is deleted successfully!",
    statusCode: 200,
    data: deletedata,
  };
});
module.exports = {
  addProperty_type,
  viewProperty_type,
  updateProperty_type,
  deleteProperty_type,
};
