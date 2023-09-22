import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import {
  readAllSauces,
  createOneSauce,
  readOneSauce,
  updateOneSauce,
  deleteOneSauce,
} from "../controllers/sauces";
const router = Router();
// const uploadImage = require("../middleware/multer-config");
// const { sauceInputValidation } = require("../middleware/inputValidation");

router.get("/", AuthMiddleware, AuthMiddleware, readAllSauces);
router.get("/:id", AuthMiddleware, readOneSauce);
router.post("/", AuthMiddleware, createOneSauce);
router.patch("/:id", AuthMiddleware, updateOneSauce);
router.delete("/:id", AuthMiddleware, deleteOneSauce);
// router.post("/:id/like", auth, likeOneSauce);

export default router;
