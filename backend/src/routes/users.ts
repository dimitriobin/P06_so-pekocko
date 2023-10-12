import { Router } from "express";
import {
  register,
  loginUser,
  readAllUsers,
  readUser,
  updateUser,
  deleteUser,
} from "../controllers/users";
import { AuthMiddleware } from "../middlewares/auth";
const router = Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/", AuthMiddleware, readAllUsers);
router.get("/:id", AuthMiddleware, readUser);
router.patch("/:id", AuthMiddleware, updateUser);
router.delete("/:id", AuthMiddleware, deleteUser);

export default router;
