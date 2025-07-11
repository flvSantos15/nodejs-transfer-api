import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../lib/prisma";
import { Account, TAccount } from "../../entity/TAccount";
import { IAccountRepository } from "../IAccountRepository";

export class AccountRepositoryPrisma implements IAccountRepository {
  async create(userId: string): Promise<void> {
    const account = new Account({ userId, balance: 0 });

    await prisma.account.create({
      data: {
        id: account.id,
        name: "",
        userId: account.userId,
        balance: account.balance,
      },
    });

    return;
  }

  async getAccountByUserId(userId: string): Promise<TAccount | null> {
    const account = await prisma.account.findFirst({
      where: {
        userId,
      },
    });

    if (!account) {
      throw new AppError("Account not found", 404);
    }

    return account;
  }

  async increaseBalance(accountId: string, amount: number): Promise<void> {
    await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return;
  }

  async decreaseBalance(accountId: string, amount: number): Promise<void> {
    await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    return;
  }
}

