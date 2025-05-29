import { AppError } from "../../../../errors/AppError";
import { IAccountRepository } from "../../repository/IAccountRepository";
import { AccountRepositoryInMemory } from "../../repository/in-memory/AccountRepositoryInMemory";
import { IncreaseAccountBalanceUseCase } from "./increaseAccountBalance.useCase";

let increaseAccountBalanceUseCase: IncreaseAccountBalanceUseCase;
let accountRepository: IAccountRepository;

describe("Increase Account Balance UseCase", () => {
  beforeEach(() => {
    accountRepository = new AccountRepositoryInMemory();
    increaseAccountBalanceUseCase = new IncreaseAccountBalanceUseCase(
      accountRepository,
    );
  });

  it("should not be able to increase the account balance if the account does not exist", async () => {
    await expect(
      increaseAccountBalanceUseCase.execute({
        accountId: "account-id",
        amount: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to increase the account balance if the amount is less than 0", async () => {
    await accountRepository.create("user-id");

    const account = await accountRepository.getAccountByUserId("user-id");

    await expect(
      increaseAccountBalanceUseCase.execute({
        accountId: account.id,
        amount: -100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to increase the account balance if the amount is 0", async () => {
    await accountRepository.create("user-id");

    const account = await accountRepository.getAccountByUserId("user-id");

    await expect(
      increaseAccountBalanceUseCase.execute({
        accountId: account.id,
        amount: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to increase the account balance", async () => {
    await accountRepository.create("user-id");

    const account = await accountRepository.getAccountByUserId("user-id");

    await increaseAccountBalanceUseCase.execute({
      accountId: account.id,
      amount: 100,
    });

    const accountUpdated = await accountRepository.getAccountByUserId(
      "user-id",
    );

    expect(accountUpdated.balance).toEqual(100);
  });
});

