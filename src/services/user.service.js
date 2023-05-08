const userModel = require("../Models/user.model");
const catchAsync = require("../utils/asyncFunction");

export const updateProfile = catchAsync(async (body, profileImage) => {
  // 1) Check if profile image provided
  if (profileImage === undefined) {
    return {
      type: "Error",
      message: "profileImageRequired",
      statusCode: 400,
    };
  }

  const { name, username, email, password, passwordConfirmation, role } = body;
  let { companyName, address, phone } = body;

  if (!companyName) companyName = "";
  if (!address) address = "";
  if (!phone) phone = "";

  // 2) Check required fields
  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !passwordConfirmation ||
    !role ||
    profileImage.length === 0
  ) {
    return {
      type: "Error",
      message: "fieldsRequired",
      statusCode: 400,
    };
  }

  const isEmailTaken = await userModel.isEmailTaken(email);

  // 3) Check if email already taken
  if (isEmailTaken) {
    return {
      type: "Error",
      message: "emailTaken",
      statusCode: 409,
    };
  }

  // 4) Specifiy folder name where the images are going to be uploaded in cloudinary
  const folderName = `Users/${name.trim().split(" ").join("")}`;

  // 5) Upload image to cloudinary
  const image = await uploadFile(
    dataUri(profileImage).content,
    folderName,
    600
  );

  // 6) Create new user
  const user = await User.create({
    name,
    username,
    email,
    password,
    passwordConfirmation,
    role,
    companyName,
    address,
    phone,
    profileImage: image.secure_url,
    profileImageId: image.public_id,
  });

  // 7) If everything is OK, send data
  return {
    type: "Success",
    message: "successfulSignUp",
    statusCode: 201,
    user,
  };
});

module.exports = {
  updateProfile,
};
