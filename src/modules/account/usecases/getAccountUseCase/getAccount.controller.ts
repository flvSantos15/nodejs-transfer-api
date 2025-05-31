import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { AccountRepositoryPrisma } from "../../repository/prisma/AccountRepositoryPrisma";
import { GetAccountUseCase } from "./getAccount.useCase";

const accountRepositoryPrisma = new AccountRepositoryPrisma();
const getAccountUseCase = new GetAccountUseCase(accountRepositoryPrisma);

export class GetAccountController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;

    if (!userId) {
      throw new AppError("User ID is required", 400);
    }

    try {
      const account = await getAccountUseCase.execute({ userId });

      response.status(200).json(account);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new AppError(error.message, 400);
      } else {
        throw new AppError("An unknown error occurred", 500);
      }
    }
  }
}

