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

    return account;
  }
}

