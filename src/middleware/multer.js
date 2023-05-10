const path = require("path");
const multer = require("multer");
const express = require("express");

var upload = multer({
  storage: multer.diskStorage({}),
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);

    cb(null, path.parse(file.originalname).name + "_" + Date.now() + ext);
  },
}).any("photo");

module.exports = upload;
