import { Request, Response } from "express";
import { UserRepositoryPrisma } from "../../../repository/implementation/UserRepositoryPrisma";
import { CreateUserUseCase } from "./createUser.useCase";

const userRepo = new UserRepositoryPrisma();
const createUserUseCase = new CreateUserUseCase(userRepo);

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      response
        .status(400)
        .json({ error: "Name, email and password are required" });
    }

    try {
      await createUserUseCase.execute({ name, email, password });

      response.status(201).json({ message: "User created successfully" });
    } catch (error) {
      response.status(500).json({ error: "Internal server error" });
    }
  }
}

