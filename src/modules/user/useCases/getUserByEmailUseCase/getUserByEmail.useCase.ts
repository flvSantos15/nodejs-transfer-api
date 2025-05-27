import { TUser } from "../../entity/User";
import { IUserRepository } from "../../repository/IUserRepository";

interface IGetUserByEmailUseCaseRequest {
  email: string;
}

interface IGetUserByEmailUseCase {
  execute({ email }: IGetUserByEmailUseCaseRequest): Promise<TUser | null>;
}

export class GetUserByEmailUseCase implements IGetUserByEmailUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({
    email,
  }: IGetUserByEmailUseCaseRequest): Promise<TUser | null> {
    const user = await this.userRepo.getUserByEmail(email);

    return user;
  }
}

