import { AppError } from "../../../../errors/AppError";
import { IAccountRepository } from "../../repository/IAccountRepository";

interface ICreateAccountUseCase {
  execute({ userId }: { userId: string }): Promise<void>;
}

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(private accountRepo: IAccountRepository) {}

  async execute({ userId }: { userId: string }): Promise<void> {
    const accountAlreadyExists = await this.accountRepo.getAccountByUserId(
      userId,
    );

    if (accountAlreadyExists) {
      throw new AppError("This User already have an account", 400);
    }

    this.accountRepo.create(userId);
  }
}

