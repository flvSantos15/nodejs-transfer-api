import { IAccountRepository } from "../../../../modules/account/repository/IAccountRepository";
import { ITransactionRepository } from "../../../../modules/transaction/repository/ITransactionRepository";

interface ITransferUseCaseRequest {
  originAccountId: string;
  destinationAccountId: string;
  amount: number;
}

interface ITransferUseCase {
  execute({
    originAccountId,
    destinationAccountId,
    amount,
  }: ITransferUseCaseRequest): Promise<void>;
}

export class TransferUseCase implements ITransferUseCase {
  constructor(
    private accountRepo: IAccountRepository,
    private transactionRepo: ITransactionRepository,
  ) {}

  async execute({
    originAccountId,
    destinationAccountId,
    amount,
  }: ITransferUseCaseRequest): Promise<void> {
    await this.accountRepo.decreaseBalance(originAccountId, amount);

    await this.accountRepo.increaseBalance(destinationAccountId, amount);

    await this.transactionRepo.transfer(
      originAccountId,
      destinationAccountId,
      amount,
    );

    // service de aviso de transferencia
  }
}

