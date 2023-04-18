const resident_typeModel = require("../Models/resident_type.model");
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

module.exports = { addResident_type };
