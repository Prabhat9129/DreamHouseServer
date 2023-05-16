const cloudinary = require("cloudinary").v2;

// Setting The Cloudinary Configurations
cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//Destroy the file
const destroyFile = (PublicID) =>
  cloudinary.uploader.destroy(PublicID, (err, des) => des);

//upload the file on cloudnary
const uploadFile = (file, folderName, width) =>
  cloudinary.uploader.upload(file, {
    folder: `${folderName}`,
    width: width,
    crop: "fit",
  });

module.exports = { destroyFile, uploadFile };
