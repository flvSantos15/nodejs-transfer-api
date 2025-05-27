import { TUser } from "../entity/User";

export interface IUserRepository {
  create(user: TUser): Promise<void>;
  getUserByEmail(email: string): Promise<TUser | null>;
  getUserById(id: string): Promise<TUser | null>;
  getUsers(): Promise<TUser[]>;
}

