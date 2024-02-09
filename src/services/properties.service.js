const catchAsync = require("../utils/asyncFunction");
const propertiesModel = require("../Models/property.model");
const userModel = require("../Models/user.model");
const bookingModel = require("../Models/booking.model");
const { uploadFile, destroyFile } = require("../utils/cloudnary");
const properties_typeModel = require("../Models/property_type.model");
const resident_typeModel = require("../Models/resident_type.model");
const { all } = require("../app");

const addProperty = catchAsync(async (req) => {
  //Destructing body
  const propertyImage = req.files.image.tempFilePath;
  console.log(req.files);
  console.log(req.body)
  const { title, description, status, type, rooms,price,area,address,country,state,city, latitude,longitude} =await req.body;
  let { age, bed, bath } =await req.body;

  //field are require
  if (
    !title ||
    !description ||
    !status ||
    !type ||
    !rooms ||
    !price ||
    !area ||
    !address ||
    !country ||
    !state ||
    !city ||
    !latitude ||
    !longitude 
  ) {
    return {
      status: "Error",
      message: "All fields are required!",
      statusCode: 400,
    };
  }

  // properties_type;
  // const Isproperties_typename = await properties_typeModel.findOne({
  //   name: properties_typeName,
  // });
  // if (!Isproperties_typename) {
  //   return {
  //     status: "Error",
  //     message: "Property_type name is Invalid!",
  //     statusCode: 400,
  //   };
  // }

  //Resident_Type
  // const Isresident_typeName = await resident_typeModel.findOne({
  //   name: resident_typeName,
  // });

  // if (!Isresident_typeName) {
  //   return {
  //     status: "Error",
  //     message: "Resident_type name is Invalid!",
  //     statusCode: 400,
  //   };
  // }
 // Specifiy folder name where the images are going to be uploaded in cloudinary
  const folderName = `Property/${title.trim().split(" ").join("")}`;

  // Upload image to cloudinary
  const image = await uploadFile(propertyImage, folderName, 600);

  //Insert Into collection
  let data = {};
  if (req.user.role === "seller") {
    data = await propertiesModel.create({
      user_id: req.user._id,
      title:title,
      description:description,
      status:status,
      type:type,
      rooms:rooms,
      price:price,
      area:area,
      image:image.secure_url,
      address:address,
      country:country,
      state:state,
      city:city,
      latitude:latitude,
      longitude:longitude,
      age:age,
      bed:bed,
      bath:bath
    });
  } else {
    return {
      status: "fail",
      message: "your role is not authorized for this task!",
      statusCode: 401,
      data: data,
    };
  }

  // return data
  return {
    status: "success",
    message: "Properties Added successfully!",
    statusCode: 201,
    data,
  };
});

const findAllProperty = catchAsync(async () => {
  const properties=await propertiesModel.find();
 
 if(!properties){
   return {
     status: "Error",
     message: "Failed to fetch properties",
     statusCode: 500,
   }
 }
 return {
  status: "success",
  message: "Properties find successfully!",
  statusCode: 200,
  properties
};

})


const findProperties = catchAsync(async (req) => {
 console.log(req.params.id)
  const property=await propertiesModel.findById({_id:req.params.id});
  console.log(property)
  
 if(!property){
  return {
    status: "Error",
    message: "Failed to fetch properties",
    statusCode: 500,
  }
}
return {
 status: "success",
 message: "Properties find successfully!",
 statusCode: 200,
 property
};
})

const allowProperty = catchAsync(async(req)=>{

  if(req.user.role!=='admin'){
    return {
      status: "fail",
      message: "Due to your role , you can't update the data",
      statusCode: 401,
    };}

  const property = await propertiesModel.findByIdAndUpdate(
    {_id:req.params.id},
    {allowance:req.body.allowance},
    {new:true}
    )

    const allproperty=await propertiesModel.find()
    
    return {
      status: "success",
      message: "Property allowance updated successfully",
      statusCode: 200,
      property
    }
})

const booking = catchAsync(async(req)=>{
  const { property_id, message} =await req.body;

  if(!property_id || !message){
    return {
      status: "Error",
      message: "All fields are required!",
      statusCode: 400,
    };
  }

  const property=await propertiesModel.findById({_id:property_id})
  

  if(!property){
    return {
      status: "fail",
      message: "not find any property from this id",
      statusCode: 404,
    };}

    book=bookingModel.create(
      {
        property_id:property_id,
        buyer_id:req.user._id,
        seller_id:property.user_id,
        message:message
      });

      return {
        status: "success",
        message: "booking successfully!",
        statusCode: 201,
        book,
      };
})


const findallbooking = catchAsync(async(req)=>{
  if(req.user.role!=='admin'){
    return {
      status: "fail",
      message: "Due to your role , you can't update the data",
      statusCode: 401,
    };}

  const allbooking=await bookingModel.find();

  // console.log(allbooking,allbooking.user_id);
  // const buyer=await userModel.findById({_id:req.user._id})
  // const seller=await userModel.findById({_id:allbooking.user_id})

  // booked={
  //   booking_id:allbooking._id,
  //   message:allbooking.message,
  //   buyername:buyer.name,
  //   buyeremail:buyer.email,
  //   sellername:seller.name,
  //   selleremail:seller.email,

  // }
  
  return {
    status: "success",
    message: "Property allowance updated successfully",
    statusCode: 200,
    allbooking
  }

})



module.exports = { addProperty,findAllProperty ,findProperties,allowProperty,booking,findallbooking};
