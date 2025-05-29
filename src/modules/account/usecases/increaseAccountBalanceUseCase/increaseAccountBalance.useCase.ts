import { IAccountRepository } from "../../repository/IAccountRepository";

interface IRequest {
  accountId: string;
  amount: number;
}

interface IIncreaseAccountBalanceUseCase {
  execute({ accountId, amount }: IRequest): Promise<void>;
}

export class IncreaseAccountBalanceUseCase
  implements IIncreaseAccountBalanceUseCase
{
  constructor(private accountRepo: IAccountRepository) {}

  async execute({ accountId, amount }: IRequest): Promise<void> {
    await this.accountRepo.increaseBalance(accountId, amount);
  }
}

