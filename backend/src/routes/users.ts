import { Router } from "express";
import {
  createUser,
  readAllUsers,
  readUser,
  updateUser,
  deleteUser,
} from "../controllers/users";
const router = Router();

router.post("/", createUser);
router.get("/", readAllUsers);
router.get("/:id", readUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
