import { AppError } from "../../../../errors/AppError";
import { AccountRepositoryInMemory } from "../../repository/in-memory/UserRepositoryInMemory";
import { CreateAccountUseCase } from "./createAccount.useCase";

let createAccountUseCase: CreateAccountUseCase;
let repository: AccountRepositoryInMemory;

describe("CreateAccountUseCase", () => {
  beforeEach(() => {
    repository = new AccountRepositoryInMemory();
    createAccountUseCase = new CreateAccountUseCase(repository);
  });

  it("should be able to create a new account", async () => {
    const userId = "user-id";

    await createAccountUseCase.execute({ userId });

    const account = await repository.getAccountByUserId(userId);

    expect(account).toBeDefined();
    expect(account.userId).toEqual(userId);
    expect(account.balance).toEqual(0);
  });

  it("should not be able to create an account for a user that already has an account", async () => {
    const userId = "user-id";

    await createAccountUseCase.execute({ userId });

    await expect(
      createAccountUseCase.execute({ userId }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

