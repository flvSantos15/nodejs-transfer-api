import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { AccountRepositoryPrisma } from "../../../../modules/account/repository/prisma/AccountRepositoryPrisma";
import { TransactionRepositoryPrisma } from "../../../../modules/transaction/repository/prisma/TransactionRepositoryPrisma";
import { WithdrawUseCase } from "./withdraw.useCase";

const accountRepo = new AccountRepositoryPrisma();
const transactionRepo = new TransactionRepositoryPrisma();
const withdrawUseCase = new WithdrawUseCase(accountRepo, transactionRepo);

export class WithdrawController {
  async handle(request: Request, response: Response) {
    console.log("body", request.body);

    const { accountId } = request.params;
    const { amount } = request.body;

    if (!accountId) {
      throw new AppError("Account ID is required", 400);
    }

    if (!amount) {
      throw new AppError("Amount is required", 400);
    }

    if (Number(amount) <= 0) {
      throw new AppError("Amount must be greater than 0", 400);
    }

    try {
      // fazer o increase na conta e criar a transacao
      await withdrawUseCase.execute({ accountId, amount });

      response.status(201).json({ message: "Withdraw successful" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new AppError(error.message, 400);
      } else {
        throw new AppError("An unknown error occurred", 500);
      }
    }
  }
}

