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
              id: true,
              name: true,
            },
          },
        },
      },
      dislikes: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
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
              id: true,
              name: true,
            },
          },
        },
      },
      dislikes: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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

export async function deleteSauce(id: string) {
  const sauceId = Number(id);
  const deleteLikes = await prisma.likes.deleteMany({
    where: {
      sauceId,
    },
  });
  const deleteDislikes = await prisma.dislikes.deleteMany({
    where: {
      sauceId,
    },
  });
  const deleteSauce = await prisma.sauce.delete({
    where: {
      id: sauceId,
    },
  });
  return Promise.all([deleteLikes, deleteDislikes, deleteSauce]);
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
