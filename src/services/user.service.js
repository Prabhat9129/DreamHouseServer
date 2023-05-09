const userModel = require("../Models/user.model");
const catchAsync = require("../utils/asyncFunction");
const { uploadFile, destroyFile } =require('../utils/cloudnary');


 const updateProfile = catchAsync(async (req) => {
 
  console.log(req.files.profileImage)
  const profileImage=req.files.profileImage
  // 1- Check if profile image provided
  if (profileImage === undefined) {
    return {
      status: "Error",
      message: "profileImage is Required",
      statusCode: 400,
    };
  }

  const { name, email, password,  role ,number,gender,city_id,address,pincode} = req.body;
 

  // 2- Check required fields
  if (
    !name ||
    !email ||
    !password ||
    !role ||
    !number ||
    !gender ||
    !city_id ||
    !address ||
    !pincode ||
    profileImage.length === 0
  ) {
    return {
      status: "Error",
      message: "fields are Required",
      statusCode: 400,
    };
  }

//3- check email is there

  

  // 4) Specifiy folder name where the images are going to be uploaded in cloudinary
  const folderName = `Users/${name.trim().split(" ").join("")}`;

  // 5- Upload image to cloudinary
  const image = await uploadFile(
    profileImage,
    folderName,
    600
  );

  // 6- Create new user
  console.log(req.user._id)
  const updatedata = await userModel.updateOne({_id:req.user._id},{
    name,
    email,
    password,
    role,
    number,
    gender,
    profileImage: image.secure_url,
    address,
    city_id,
    pincode,
  });

  console.log(updatedata)
  // 7- If everything is OK, send data
  return {
    status: "Success",
    message: "data updated successfully!",
    statusCode: 201,
    updatedata,
  };
});

module.exports = {updateProfile};
