import { NextFunction, Request, Response } from "express";
import multer, { diskStorage } from "multer";

const MIME_TYPES: Record<string, string> = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploaded_images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const ext = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + ext);
  },
});

export default multer({
  storage,
}).single("imageUrl");
