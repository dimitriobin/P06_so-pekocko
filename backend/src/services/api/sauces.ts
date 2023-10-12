import { PrismaClient, Sauce } from "@prisma/client";
const prisma = new PrismaClient();

export async function createSauce({
  name,
  manufacturer,
  description,
  mainPepper,
  imageUrl,
  heat,
  userId,
}: Sauce): Promise<Sauce> {
  return await prisma.sauce.create({
    data: {
      name,
      manufacturer,
      description,
      mainPepper,
      imageUrl,
      heat,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function readSauces() {
  return await prisma.sauce.findMany({
    include: {
      _count: {
        select: {
          likes: true,
          dislikes: true,
        },
      },
      likes: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      dislikes: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function readSauce(id: string) {
  return await prisma.sauce.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      _count: {
        select: {
          likes: true,
          dislikes: true,
        },
      },
      likes: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      dislikes: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function updateSauce(
  {
    name,
    manufacturer,
    description,
    mainPepper,
    imageUrl,
    heat,
    userId,
  }: Sauce,
  id: string
) {
  return await prisma.sauce.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      manufacturer,
      description,
      mainPepper,
      imageUrl,
      heat,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function deleteSauce(id: string) {
  return await prisma.sauce.delete({
    where: {
      id: Number(id),
    },
  });
}

export async function anonymizeSauceUser(userId: string) {
  return await prisma.sauce.updateMany({
    where: {
      userId: Number(userId),
    },
    data: {
      id: 1,
    },
  });
}
