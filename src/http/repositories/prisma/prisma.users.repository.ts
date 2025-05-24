import { prisma } from "@/config/database";
import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../../interfaces/user.repository.interface";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async getById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}

export const prismaUsersRepository = new PrismaUsersRepository();
