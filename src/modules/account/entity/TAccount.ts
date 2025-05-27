import { v4 as uuidv4 } from "uuid";

export type TAccount = {
  id?: string;
  userId: string;
  balance: number;
};

export class Account implements TAccount {
  id: string;
  userId: string;
  balance: number;

  constructor({ userId, balance }: TAccount) {
    this.id = uuidv4();
    this.userId = userId;
    this.balance = balance;
  }
}

