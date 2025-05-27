import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UserRepositoryPrisma } from "../modules/user/repository/implementation/UserRepositoryPrisma";

interface Payload {
  id: string;
}

export async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not found", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = verify(token, `${process.env.JWT_SECRET}`) as Payload;

    const userRepo = new UserRepositoryPrisma();

    const user = await userRepo.getUserById(decode.id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: decode.id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}

