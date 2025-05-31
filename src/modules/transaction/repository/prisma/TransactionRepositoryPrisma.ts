import { prisma } from "../../../../lib/prisma";
import { Transaction, TransactionType } from "../../entity/Transaction";
import { ITransactionRepository } from "../ITransactionRepository";

export class TransactionRepositoryPrisma implements ITransactionRepository {
  async deposit(accountId: string, amount: number): Promise<void> {
    const transaction = new Transaction({
      originAccountId: accountId,
      destinationAccountId: accountId,
      amount,
      type: TransactionType.DEPOSIT,
    });

    await prisma.transaction.create({ data: transaction });
  }

  async withdraw(
    accountId: string,
    amount: number,
    _userId: string,
  ): Promise<void> {
    const transaction = new Transaction({
      originAccountId: accountId,
      destinationAccountId: accountId,
      amount,
      type: TransactionType.WITHDRAW,
    });

    await prisma.transaction.create({ data: transaction });
  }

  async transfer(
    originAccountId: string,
    destinationAccountId: string,
    amount: number,
    _userId: string,
  ): Promise<void> {
    const transaction = new Transaction({
      originAccountId,
      destinationAccountId,
      amount,
      type: TransactionType.TRANSFER,
    });

    await prisma.transaction.create({ data: transaction });
  }
}

