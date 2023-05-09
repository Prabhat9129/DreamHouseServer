const express = require("express");
const router = express.Router();
const cloudinary=require('cloudinary').v2
const protect = require("../middleware/protect.middleware");
const {updateProfiles}=require('../controller/user.controller')

router.use(protect)
router.post("/file",(req,res)=>{
    console.log(req.files.photo,req.body)
    const file=req.files.photo
cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result)
});

})
router.patch("/updateprofile", updateProfiles);
module.exports=router