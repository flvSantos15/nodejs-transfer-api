import { IAccountRepository } from "../../../../modules/account/repository/IAccountRepository";
import { ITransactionRepository } from "../../../../modules/transaction/repository/ITransactionRepository";

interface IDepositUseCaseRequest {
  accountId: string;
  amount: number;
}

interface IDepositUseCase {
  execute({ accountId, amount }: IDepositUseCaseRequest): Promise<void>;
}

export class DepositUseCase implements IDepositUseCase {
  constructor(
    private accountRepo: IAccountRepository,
    private transactionRepo: ITransactionRepository,
  ) {}

  async execute({ accountId, amount }: IDepositUseCaseRequest): Promise<void> {
    await this.accountRepo.increaseBalance(accountId, amount);

    await this.transactionRepo.deposit(accountId, amount);

    // service de aviso de deposito em conta
  }
}

