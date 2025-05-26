import { TUser } from "../../../entity/User";
import { IUserRepository } from "../../../repository/IUserRepository";

interface IGetUsersUseCase {
  execute(): Promise<TUser[]>;
}

export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(): Promise<TUser[]> {
    const users = await this.userRepo.getUsers();

    return users;
  }
}

