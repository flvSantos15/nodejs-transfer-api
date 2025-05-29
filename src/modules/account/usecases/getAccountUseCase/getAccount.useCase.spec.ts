import { AppError } from "../../../../errors/AppError";
import { AccountRepositoryInMemory } from "../../repository/in-memory/AccountRepositoryInMemory";
import { GetAccountUseCase } from "./getAccount.useCase";

let getAccountUseCase: GetAccountUseCase;
let accountRepository: AccountRepositoryInMemory;

describe("Get Account", () => {
  beforeEach(() => {
    accountRepository = new AccountRepositoryInMemory();
    getAccountUseCase = new GetAccountUseCase(accountRepository);
  });

  it("should be able to get an account by ID", async () => {
    await accountRepository.create("user-id");

    const accountById = await getAccountUseCase.execute({ userId: "user-id" });

    expect(accountById).toBeDefined();
    expect(accountById.userId).toEqual("user-id");
    expect(accountById.balance).toEqual(0);
  });

  it("should not be able to get an account by ID if it does not exist", async () => {
    await expect(
      getAccountUseCase.execute({ userId: "user-id" }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

