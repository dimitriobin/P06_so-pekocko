// const router = require("express").Router();
import { Router } from "express";
import { readAllSauces, createOneSauce } from "../controllers/sauces";
const router = Router();
// const auth = require("../middleware/auth");
// const uploadImage = require("../middleware/multer-config");
// const { sauceInputValidation } = require("../middleware/inputValidation");

router.get("/", readAllSauces);
// router.get("/:id", auth, readOneSauce);
router.post("/", createOneSauce);
// router.put("/:id", auth, uploadImage, sauceInputValidation, updateOneSauce);
// router.delete("/:id", auth, deleteOneSauce);
// router.post("/:id/like", auth, likeOneSauce);

export default router;
