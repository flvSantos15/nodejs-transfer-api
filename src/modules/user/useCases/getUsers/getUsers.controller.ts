import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { UserRepositoryPrisma } from "../../repository/prisma/UserRepositoryPrisma";
import { GetUsersUseCase } from "./getUsers.useCase";

const userRepo = new UserRepositoryPrisma();
const getUsersUseCase = new GetUsersUseCase(userRepo);

export class GetUsersController {
  async handle(_request: Request, response: Response) {
    try {
      const users = await getUsersUseCase.execute();

      response.status(200).json(users);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new AppError(error.message, 400);
      } else {
        throw new AppError("An unknown error occurred", 500);
      }
    }
  }
}

