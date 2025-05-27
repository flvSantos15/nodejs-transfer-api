import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { UserRepositoryPrisma } from "../../repository/implementation/UserRepositoryPrisma";
import { AuthenticateUserUseCase } from "./authenticateUser.useCase";

const userRepo = new UserRepositoryPrisma();
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepo);

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      response.status(400).json({ error: "Email and password are required" });
    }

    try {
      const token = await authenticateUserUseCase.execute({ email, password });

      response.status(200).json(token);
    } catch (error) {
      console.log("Error =>", error);
      throw new AppError("Internal server error", 500);
    }
  }
}

