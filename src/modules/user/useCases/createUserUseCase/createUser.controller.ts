import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { EmailService } from "../../../../services/EmailService";
import { UserRepositoryPrisma } from "../../repository/prisma/UserRepositoryPrisma";
import { CreateUserUseCase } from "./createUser.useCase";

const userRepo = new UserRepositoryPrisma();
const emailService = new EmailService();
const createUserUseCase = new CreateUserUseCase(userRepo, emailService);

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Name, email and password are required", 400);
    }

    try {
      await createUserUseCase.execute({ name, email, password });

      response.status(201).json({ message: "User created successfully" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new AppError(error.message, 400);
      } else {
        throw new AppError("An unknown error occurred", 500);
      }
    }
  }
}

