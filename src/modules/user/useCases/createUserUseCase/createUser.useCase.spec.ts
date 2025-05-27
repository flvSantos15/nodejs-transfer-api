import { AppError } from "../../../../errors/AppError";
import { UserRepositoryInMemory } from "../../repository/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "./createUser.useCase";

let repository: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    repository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(repository);
  });

  it("should create a new user", async () => {
    const user = {
      name: "Alberto",
      email: "alberto@example.com",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    const foundUser = await repository.getUserByEmail(user.email);

    expect(foundUser).toBeDefined();
    expect(foundUser?.name).toEqual(user.name);
    expect(foundUser?.email).toEqual(user.email);
  });

  it("should throw error if user already exists", async () => {
    const user = {
      name: "Alberto",
      email: "alberto@example.com",
      password: "123456",
    };

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

