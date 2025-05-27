import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../repository/IUserRepository";

interface IAuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserUseCaseResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export class AuthenticateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserUseCaseRequest): Promise<IAuthenticateUserUseCaseResponse> {
    const user = await this.userRepo.getUserByEmail(email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const passwordMatch = await compare(password, `${user.password}`);

    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "1d",
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

