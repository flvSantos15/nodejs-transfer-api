import { UserRepositoryInMemory } from "../../repository/in-memory/UserRepositoryInMemory";
import { GetUserByEmailUseCase } from "./getUserByEmail.useCase";

let repository: UserRepositoryInMemory;
let getUserByEmailUseCase: GetUserByEmailUseCase;

describe("Get User By Email", () => {
  beforeEach(() => {
    repository = new UserRepositoryInMemory();
    getUserByEmailUseCase = new GetUserByEmailUseCase(repository);
  });

  it("should return null if user not found", async () => {
    const input = {
      email: "notfound@example.com",
    };

    const user = await getUserByEmailUseCase.execute({ email: input.email });

    expect(user).toBeNull();
  });

  it("should get user by email", async () => {
    const input = {
      email: "alberto@example.com",
    };

    await repository.create({
      name: "Alberto",
      email: input.email,
      password: "123456",
    });

    const user = await getUserByEmailUseCase.execute({ email: input.email });

    expect(user).toBeDefined();
    expect(user?.email).toEqual(input.email);
    expect(user?.id).toBeDefined();
    expect(user?.name).toBeDefined();
  });
});

