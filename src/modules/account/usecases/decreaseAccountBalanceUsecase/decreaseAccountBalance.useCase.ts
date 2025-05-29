import { IAccountRepository } from "../../repository/IAccountRepository";

interface IRequest {
  accountId: string;
  amount: number;
}

interface IDecreaseAccountBalanceUseCase {
  execute({ accountId, amount }: IRequest): Promise<void>;
}

export class DecreaseAccountBalanceUseCase
  implements IDecreaseAccountBalanceUseCase
{
  constructor(private accountRepo: IAccountRepository) {}

  async execute({ accountId, amount }: IRequest): Promise<void> {
    await this.accountRepo.decreaseBalance(accountId, amount);
  }
}

