import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { UserRepositoryPrisma } from "../../repository/prisma/UserRepositoryPrisma";
import { AuthenticateUserUseCase } from "./authenticateUser.useCase";

const userRepo = new UserRepositoryPrisma();
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepo);

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    try {
      const token = await authenticateUserUseCase.execute({ email, password });

      response.status(200).json(token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new AppError(error.message, 400);
      } else {
        throw new AppError("An unknown error occurred", 500);
      }
    }
  }
}

