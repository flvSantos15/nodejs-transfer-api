import { TUser, User } from "../../entity/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  private users: TUser[] = [];

  async create({ name, email, password }: TUser): Promise<void> {
    const user = new User({ name, email, password });

    this.users.push(user);
  }

  async getUserByEmail(email: string): Promise<TUser | null> {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser || null;
  }

  async getUsers(): Promise<TUser[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<TUser | null> {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser || null;
  }
}

