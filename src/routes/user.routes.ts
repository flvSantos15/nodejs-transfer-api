import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { CreateUserController } from "../modules/user/useCases/createUserUseCase/createUser.controller";
import { GetUserByEmailController } from "../modules/user/useCases/getUserByEmailUseCase/getUserByEmail.controller";
import { GetUsersController } from "../modules/user/useCases/getUsers/getUsers.controller";

const userRouter = Router();

const createUserController = new CreateUserController();
const getUserByEmailController = new GetUserByEmailController();
const getUsersController = new GetUsersController();

userRouter.post("/", createUserController.handle);
userRouter.get("/:email", authMiddleware, getUserByEmailController.handle);
userRouter.get("/", authMiddleware, getUsersController.handle);

export { userRouter };

