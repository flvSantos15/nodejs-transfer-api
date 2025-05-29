import { AppError } from "../../../../errors/AppError";
import { IAccountRepository } from "../../repository/IAccountRepository";
import { AccountRepositoryInMemory } from "../../repository/in-memory/AccountRepositoryInMemory";
import { DecreaseAccountBalanceUseCase } from "./decreaseAccountBalance.useCase";

let accountRepository: IAccountRepository;
let decreaseAccountBalanceUseCase: DecreaseAccountBalanceUseCase;

describe("Decrease Account Balance UseCase", () => {
  beforeEach(() => {
    accountRepository = new AccountRepositoryInMemory();
    decreaseAccountBalanceUseCase = new DecreaseAccountBalanceUseCase(
      accountRepository,
    );
  });

  it("should not be able to decrease the account balance if the account does not exist", async () => {
    await expect(
      decreaseAccountBalanceUseCase.execute({
        accountId: "account-id",
        amount: 100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to decrease the account balance if the amount is less than 0", async () => {
    await accountRepository.create("user-id");

    const account = await accountRepository.getAccountByUserId("user-id");

    await expect(
      decreaseAccountBalanceUseCase.execute({
        accountId: account.id,
        amount: -100,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to decrease the account balance if the amount is 0", async () => {
    await accountRepository.create("user-id");

    const account = await accountRepository.getAccountByUserId("user-id");

    await expect(
      decreaseAccountBalanceUseCase.execute({
        accountId: account.id,
        amount: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to decrease the account balance if the amount is greater than the account balance", async () => {
    await accountRepository.create("user-id");

    const account = await accountRepository.getAccountByUserId("user-id");

    await expect(
      decreaseAccountBalanceUseCase.execute({
        accountId: account.id,
        amount: 101,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to decrease the account balance", async () => {
    await accountRepository.create("user-id");

    const account = await accountRepository.getAccountByUserId("user-id");

    await accountRepository.increaseBalance(account.id, 100);

    await decreaseAccountBalanceUseCase.execute({
      accountId: account.id,
      amount: 60,
    });

    const accountUpdated = await accountRepository.getAccountByUserId(
      "user-id",
    );

    expect(accountUpdated.balance).toEqual(40);
  });
});

