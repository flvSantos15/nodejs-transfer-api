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
      return null;
    }

    return account;
  }
}
