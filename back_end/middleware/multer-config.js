"use strict";
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = require("../aws-config");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const key = (req, file, callback) => {
  const extension = MIME_TYPES[file.mimetype];
  const name = file.originalname
    .split(" ")
    .join("_")
    .slice(0, file.originalname.indexOf("."));
  callback(null, name + Date.now() + "." + extension);
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid Mime Type, only JPEG or PNG"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "so-peckoko",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key,
  }),
}).single("imageUrl");

module.exports = upload;
