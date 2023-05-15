const userModel = require("../Models/user.model");
const catchAsync = require("../utils/asyncFunction");
const { uploadFile, destroyFile } = require("../utils/cloudnary");

const updateProfile = catchAsync(async (req) => {
  const profileImage = req.files.profileImg.tempFilePath;
  // 1- Check if profile image provided
  if (!profileImage) {
    return {
      status: "Error",
      message: "profileImage is Required",
      statusCode: 400,
    };
  }

  const {
    name,
    email,
    password,
    role,
    number,
    gender,
    city_id,
    address,
    pincode,
  } = req.body;

  // 2- Check required fields
  if (
    !name ||
    !email ||
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
  const image = await uploadFile(profileImage, folderName, 600);
  console.log(image);
  // 6- Update  user
  const updatedata = await userModel.updateOne(
    { _id: req.user._id },
    {
      name,
      email,
      password,
      role,
      number,
      gender,
      profileImg: image.secure_url,
      address,
      city_id,
      pincode,
    }
  );

  // console.log(updatedata);
  // 7- If everything is OK, send data
  return {
    status: "Success",
    message: "data updated successfully!",
    statusCode: 201,
    updatedata,
  };
});


const getUser=catchAsync(async(req)=>{

  const userdata = await userModel.findById(
    { _id: req.user._id }
  );
  return {
    status: "Success",
    message: "data fetch successfully!",
    statusCode: 200,
    userdata,
  };

})

module.exports = { updateProfile , getUser};
