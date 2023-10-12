import { PrismaClient, Sauce } from "@prisma/client";
const prisma = new PrismaClient();

export async function findLike(sauceId: string, userId: string) {
  return await prisma.likes.findFirst({
    where: {
      AND: {
        sauceId: Number(sauceId),
        userId: Number(userId),
      },
    },
  });
}

export async function findDislike(sauceId: string, userId: string) {
  return await prisma.dislikes.findFirst({
    where: {
      AND: {
        sauceId: Number(sauceId),
        userId: Number(userId),
      },
    },
  });
}

export async function createLike(sauceId: string, userId: string) {
  return await prisma.likes.create({
    data: {
      sauceId: Number(sauceId),
      userId: Number(userId),
    },
  });
}

export async function deleteLike(id: number) {
  return await prisma.likes.delete({
    where: {
      id: Number(id),
    },
  });
}

export async function createDislike(sauceId: string, userId: string) {
  return await prisma.dislikes.create({
    data: {
      sauceId: Number(sauceId),
      userId: Number(userId),
    },
  });
}

export async function deleteDislike(id: number) {
  return await prisma.dislikes.delete({
    where: {
      id: Number(id),
    },
  });
}
