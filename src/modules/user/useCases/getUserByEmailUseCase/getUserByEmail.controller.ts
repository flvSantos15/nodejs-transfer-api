import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { UserRepositoryPrisma } from "../../repository/prisma/UserRepositoryPrisma";
import { GetUserByEmailUseCase } from "./getUserByEmail.useCase";

const userRepo = new UserRepositoryPrisma();
const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepo);

export class GetUserByEmailController {
  async handle(request: Request, response: Response) {
    const { email } = request.params;

    if (!email) {
      response.status(400).json({ error: "Email is required" });
    }

    try {
      const user = await getUserByEmailUseCase.execute({ email });

      response.status(200).json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new AppError(error.message, 400);
      } else {
        throw new AppError("An unknown error occurred", 500);
      }
    }
  }
}

