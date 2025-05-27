import { UserRepositoryInMemory } from "../../repository/in-memory/UserRepositoryInMemory";
import { GetUsersUseCase } from "./getUsers.useCase";

let repository: UserRepositoryInMemory;
let getUsersUseCase: GetUsersUseCase;

describe("Get Users", () => {
  beforeEach(() => {
    repository = new UserRepositoryInMemory();
    getUsersUseCase = new GetUsersUseCase(repository);
  });

  it("should return all users", async () => {
    const user = await getUsersUseCase.execute();

    expect(user).toBeDefined();
  });
});

