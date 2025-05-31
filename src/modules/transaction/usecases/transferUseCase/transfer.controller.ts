import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { AccountRepositoryPrisma } from "../../../../modules/account/repository/prisma/AccountRepositoryPrisma";
import { TransactionRepositoryPrisma } from "../../../../modules/transaction/repository/prisma/TransactionRepositoryPrisma";
import { TransferUseCase } from "./transfer.useCase";

const accountRepo = new AccountRepositoryPrisma();
const transactionRepo = new TransactionRepositoryPrisma();
const transferUseCase = new TransferUseCase(accountRepo, transactionRepo);

export class TransferController {
  async handle(request: Request, response: Response) {
    const { accountId } = request.params;
    const { destinationAccountId, amount } = request.body;

    if (!accountId) {
      throw new AppError("Account ID is required", 400);
    }

    if (!destinationAccountId) {
      throw new AppError("Destination Account ID is required", 400);
    }

    if (!amount) {
      throw new AppError("Amount is required", 400);
    }

    if (Number(amount) <= 0) {
      throw new AppError("Amount must be greater than 0", 400);
    }

    try {
      // fazer o increase na conta e criar a transacao
      await transferUseCase.execute({
        originAccountId: accountId,
        destinationAccountId,
        amount,
      });

      response.status(201).json({ message: "Transfer successful" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new AppError(error.message, 400);
      } else {
        throw new AppError("An unknown error occurred", 500);
      }
    }
  }
}

