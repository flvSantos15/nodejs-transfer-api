import { hash } from "bcrypt";
import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../repository/IUserRepository";

interface ICreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface ICreateUserUseCase {
  execute({ name, email, password }: ICreateUserUseCaseRequest): Promise<void>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserUseCaseRequest): Promise<void> {
    const userAlreadyExists = await this.userRepo.getUserByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists", 400);
    }

    const passwordHash = await hash(password, 10);

    this.userRepo.create({ name, email, password: passwordHash });
  }
}

