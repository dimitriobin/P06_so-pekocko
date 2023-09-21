import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { json } from "stream/consumers";
const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function readAllUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function readUser(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    const { email, name } = req.body;

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email,
        name,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id }: { id?: string } = req.params;
    if (1 === Number(id)) throw new Error("This user cannot be deleted");

    const sauces = prisma.sauce.updateMany({
      where: {
        userId: Number(id),
      },
      data: {
        id: 1,
      },
    });

    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(204).json({ message: "user deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
}
