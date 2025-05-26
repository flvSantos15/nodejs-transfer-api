import { TAccount } from "../../account/entity/TAccount";

export type TTransaction = {
  id: string;
  value: number;
  from: TAccount;
  to: TAccount;
};

export class Transaction implements TTransaction {
  id: string;
  value: number;
  from: TAccount;
  to: TAccount;

  constructor(id: string, value: number, from: TAccount, to: TAccount) {
    this.id = id;
    this.value = value;
    this.from = from;
    this.to = to;
  }
}

