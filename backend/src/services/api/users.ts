import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export async function createUser({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) {
  return await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });
}

export async function findUserByMail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUserById(id: number | string) {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export async function findUsers() {
  return await prisma.user.findMany();
}

export async function updateUser(userId: string | number, user: Partial<User>) {
  return await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      ...user,
    },
  });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
}
// export async function coucou() {}
// export async function coucou() {}
// export async function coucou() {}
// export async function coucou() {}
// export async function coucou() {}
