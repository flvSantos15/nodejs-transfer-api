import { TUser } from "../../user/entity/User";

export type TAccount = {
  id: string;
  user: TUser;
  balance: number;
};

export class Account implements TAccount {
  id: string;
  user: TUser;
  balance: number;

  constructor(id: string, user: TUser, balance: number) {
    this.id = id;
    this.user = user;
    this.balance = balance;
  }
}

