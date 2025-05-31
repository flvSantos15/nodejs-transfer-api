import { TAccount } from "../entity/TAccount";

export interface IAccountRepository {
  create(userId: string): Promise<void>;
  getAccountByUserId(userId: string): Promise<TAccount | null>;
  increaseBalance(accountId: string, amount: number): Promise<void>;
  decreaseBalance(accountId: string, amount: number): Promise<void>;
}

