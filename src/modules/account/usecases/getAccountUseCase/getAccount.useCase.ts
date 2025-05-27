import { AppError } from "../../../../errors/AppError";
import { TAccount } from "../../entity/TAccount";
import { IAccountRepository } from "../../repository/IAccountRepository";

interface IGetAccountUseCase {
  execute({ userId }: { userId: string }): Promise<TAccount>;
}

export class GetAccountUseCase implements IGetAccountUseCase {
  constructor(private accountRepo: IAccountRepository) {}

  async execute({ userId }: { userId: string }): Promise<TAccount> {
    const account = await this.accountRepo.getAccountByUserId(userId);

    if (!account) {
      throw new AppError("Account not found", 404);
    }

    return account;
  }
}

