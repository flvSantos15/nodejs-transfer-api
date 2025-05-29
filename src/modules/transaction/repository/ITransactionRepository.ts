export interface ITransactionRepository {
  deposit(accountId: string, amount: number): Promise<void>;
  withdraw(accountId: string, amount: number, userId: string): Promise<void>;
  transfer(
    originAccountId: string,
    destinationAccountId: string,
    amount: number,
    userId: string,
  ): Promise<void>;
}

