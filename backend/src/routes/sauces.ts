import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import {
  readAllSauces,
  createOneSauce,
  readOneSauce,
  updateOneSauce,
  deleteOneSauce,
  likeSauce,
  unLikeSauce,
  dislikeSauce,
  unDislikeSauce,
} from "../controllers/sauces";
import uploadFile from "../middlewares/uploadFile";
const router = Router();

router.get("/", AuthMiddleware, readAllSauces);
router.get("/:id", AuthMiddleware, readOneSauce);
router.post("/", AuthMiddleware, uploadFile, createOneSauce);
router.patch("/:id", AuthMiddleware, uploadFile, updateOneSauce);
router.delete("/:id", AuthMiddleware, deleteOneSauce);
router.post("/:id/like", AuthMiddleware, likeSauce);
router.post("/:id/unlike", AuthMiddleware, unLikeSauce);
router.post("/:id/dislike", AuthMiddleware, dislikeSauce);
router.post("/:id/undislike", AuthMiddleware, unDislikeSauce);

export default router;
