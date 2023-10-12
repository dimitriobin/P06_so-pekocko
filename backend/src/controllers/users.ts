import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import * as userService from "../services/api/users";
import * as sauceService from "../services/api/sauces";
const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  try {
    const { email, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await userService.createUser({
      email,
      name,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const secretTokenKey = process.env.TOKEN_SECRET as string;
    const user = await userService.findUserByMail(email);

    if (!user) throw new Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user.id.toString() }, secretTokenKey, {
        expiresIn: "2 days",
      });
      res.status(201).json({ user, token });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function readAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.findUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function readUser(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;

    const user = await userService.findUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    const { email, name } = req.body;

    const user = await userService.updateUser(id, { email, name });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    if (1 === Number(id)) throw new Error("This user cannot be deleted");

    const sauces = sauceService.anonymizeSauceUser(id);

    const user = await userService.deleteUser(id);
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
}
