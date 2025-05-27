import { prisma } from "../../../../lib/prisma";
import { TUser, User } from "../../entity/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryPrisma implements IUserRepository {
  async create({ name, email, password }: TUser): Promise<void> {
    const user = new User({ name, email, password });

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password as string,
      },
    });
  }

  async getUserByEmail(email: string): Promise<TUser | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return foundUser;
  }

  async getUsers(): Promise<TUser[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return users;
  }

  async getUserById(id: string): Promise<TUser | null> {
    const foundUser = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return foundUser;
  }
}

