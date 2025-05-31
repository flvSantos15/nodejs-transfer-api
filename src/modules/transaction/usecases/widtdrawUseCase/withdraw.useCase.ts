import { IAccountRepository } from "../../../../modules/account/repository/IAccountRepository";
import { ITransactionRepository } from "../../../../modules/transaction/repository/ITransactionRepository";

interface IWithdrawUseCaseRequest {
  accountId: string;
  amount: number;
}

interface IWithdrawUseCase {
  execute({ accountId, amount }: IWithdrawUseCaseRequest): Promise<void>;
}

export class WithdrawUseCase implements IWithdrawUseCase {
  constructor(
    private accountRepo: IAccountRepository,
    private transactionRepo: ITransactionRepository,
  ) {}

  async execute({ accountId, amount }: IWithdrawUseCaseRequest): Promise<void> {
    await this.accountRepo.decreaseBalance(accountId, amount);

    await this.transactionRepo.withdraw(accountId, amount);

    // service de aviso de saque
  }
}

