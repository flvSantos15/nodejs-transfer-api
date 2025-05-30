import { AppError } from "../../../../errors/AppError";
import { Account, TAccount } from "../../entity/TAccount";
import { IAccountRepository } from "../IAccountRepository";

export class AccountRepositoryInMemory implements IAccountRepository {
  private accounts: TAccount[] = [];

  async create(userId: string): Promise<void> {
    const account = new Account({ userId, balance: 0 });

    this.accounts.push(account);
  }

  async getAccountByUserId(userId: string): Promise<TAccount> {
    const account = this.accounts.find((account) => account.userId === userId);

    if (!account) {
      throw new AppError("Account not found", 404);
    }

    return new Account(account);
  }

  async increaseBalance(accountId: string, amount: number): Promise<void> {
    const account = this.accounts.find((account) => account.id === accountId);

    if (!account) {
      throw new AppError("Account not found", 404);
    }

    account.balance += amount;
  }

  async decreaseBalance(accountId: string, amount: number): Promise<void> {
    const account = this.accounts.find((account) => account.id === accountId);

    if (!account) {
      throw new AppError("Account not found", 404);
    }

    if (account.balance < amount) {
      throw new AppError("Insufficient balance", 400);
    }

    if (amount <= 0) {
      throw new AppError("Amount must be greater than 0", 400);
    }

    account.balance -= amount;
  }
}

