const propertyService = require("../services/properties.service");
const catchAsync = require("../utils/asyncFunction");

const addProperties = catchAsync(async (req, res) => {
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

const allProperties = catchAsync(async (req, res) => {
 const { status, message, statusCode, properties } =await propertyService.findAllProperty();

// send response
return res.status(statusCode).json({
  status,
  message: message,
  statusCode,
  properties,
});

});

const findProperty = catchAsync(async (req, res) => {
  console.log(req.params.id)
  const { status, message, statusCode, property } =await propertyService.findProperties(req);

  // send response
  return res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    property,
  });

});

const allowedproperty=catchAsync(async(req,res)=>{
  const { status, message, statusCode, property } =await propertyService.allowProperty(req);

  return res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    property,
  });
});

const book=catchAsync(async(req,res)=>{
  const { status, message, statusCode, book } =await propertyService.booking(req);

  return res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    book,
  });
})

const allbooking=catchAsync(async(req,res)=>{
  const { status, message, statusCode, allbooking } =await propertyService.findallbooking(req);

  return res.status(statusCode).json({
    status,
    message: message,
    statusCode,
    allbooking,
  });
})


module.exports = { addProperties,allProperties,findProperty,allowedproperty,book,allbooking};
