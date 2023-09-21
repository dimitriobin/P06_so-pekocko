// const router = require("express").Router();
import { Router } from "express";
import {
  readAllSauces,
  createOneSauce,
  readOneSauce,
  updateOneSauce,
  deleteOneSauce,
} from "../controllers/sauces";
const router = Router();
// const auth = require("../middleware/auth");
// const uploadImage = require("../middleware/multer-config");
// const { sauceInputValidation } = require("../middleware/inputValidation");

router.get("/", readAllSauces);
router.get("/:id", readOneSauce);
router.post("/", createOneSauce);
router.patch("/:id", updateOneSauce);
router.delete("/:id", deleteOneSauce);
// router.post("/:id/like", auth, likeOneSauce);

export default router;
