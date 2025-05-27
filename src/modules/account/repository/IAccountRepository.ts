import { TAccount } from "../entity/TAccount";

export interface IAccountRepository {
  create(userId: string): Promise<void>;
  getAccountByUserId(userId: string): Promise<TAccount | null>;
}

