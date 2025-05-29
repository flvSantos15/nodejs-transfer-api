import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { AccountRepositoryPrisma } from "../../repository/prisma/AccountRepositoryPrisma";
import { CreateAccountUseCase } from "./createAccount.useCase";

const accountRepositoryPrisma = new AccountRepositoryPrisma();
const createAccountUseCase = new CreateAccountUseCase(accountRepositoryPrisma);

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    if (!userId) {
      throw new AppError("User ID is required", 400);
    }

    try {
      await createAccountUseCase.execute({ userId });

      response.status(201).send("Account created successfully");
    } catch (error) {
      throw new AppError(error.message, error.statusCode);
    }
  }
}

