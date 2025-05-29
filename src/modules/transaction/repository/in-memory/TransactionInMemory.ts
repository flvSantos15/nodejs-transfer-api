import {
  TTransaction,
  Transaction,
  TransactionType,
} from "../../entity/Transaction";
import { ITransactionRepository } from "../ITransactionRepository";

export class TransactionRepositoryInMemory implements ITransactionRepository {
  private transactions: TTransaction[] = [];

  deposit(accountId: string, amount: number): Promise<void> {
    const transaction = new Transaction({
      originAccountId: accountId,
      destinationAccountId: accountId,
      amount,
      type: TransactionType.DEPOSIT,
    });

    this.transactions.push(transaction);
    return;
  }

  withdraw(accountId: string, amount: number, userId: string): Promise<void> {
    const transaction = new Transaction({
      originAccountId: accountId,
      destinationAccountId: accountId,
      amount,
      type: TransactionType.WITHDRAW,
    });

    this.transactions.push(transaction);
    return;
  }

  transfer(
    originAccountId: string,
    destinationAccountId: string,
    amount: number,
    userId: string,
  ): Promise<void> {
    const transaction = new Transaction({
      originAccountId,
      destinationAccountId,
      amount,
      type: TransactionType.TRANSFER,
    });

    this.transactions.push(transaction);
    return;
  }
}

