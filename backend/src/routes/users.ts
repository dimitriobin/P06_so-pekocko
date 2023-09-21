import { Router } from "express";
import {
  createUser,
  loginUser,
  readAllUsers,
  readUser,
  updateUser,
  deleteUser,
} from "../controllers/users";
const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", readAllUsers);
router.get("/:id", readUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
