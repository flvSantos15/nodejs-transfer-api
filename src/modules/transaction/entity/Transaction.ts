import { v4 as uuidv4 } from "uuid";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  TRANSFER = "transfer",
}

export type TTransaction = {
  id?: string;
  amount: number;
  type: TransactionType;
  originAccountId: string;
  destinationAccountId: string;
};

export class Transaction implements TTransaction {
  id?: string;
  amount: number;
  type: TransactionType;
  originAccountId: string;
  destinationAccountId: string;

  constructor({
    amount,
    type,
    originAccountId,
    destinationAccountId,
  }: TTransaction) {
    this.id = uuidv4();
    this.amount = amount;
    this.type = type;
    this.originAccountId = originAccountId;
    this.destinationAccountId = destinationAccountId;
  }
}

