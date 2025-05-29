import { TAccount } from "../entity/TAccount";

export interface IAccountRepository {
  create(userId: string): Promise<void>;
  getAccountByUserId(userId: string): Promise<TAccount | null>;
  increaseBalance(accountId: string, amount: number): Promise<void>;
  decreaseBalance(accountId: string, amount: number): Promise<void>;
  // mover para o transaction
  // deposit(accountId: string, amount: number): Promise<void>;
  // withdraw(accountId: string, amount: number, userId: string): Promise<void>;
  // transfer(originAccountId: string, destinationAccountId: string, amount: number, userId: string): Promise<void>;
}

