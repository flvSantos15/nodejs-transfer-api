import { Router } from "express";
import { CreateUserController } from "../modules/user/useCases/user/createUserUseCase/createUser.controller";
import { GetUserByEmailController } from "../modules/user/useCases/user/getUserByEmailUseCase/getUserByEmail.controller";
import { GetUsersController } from "../modules/user/useCases/user/getUsers/getUsers.controller";

const userRouter = Router();

const createUserController = new CreateUserController();
const getUserByEmailController = new GetUserByEmailController();
const getUsersController = new GetUsersController();

userRouter.post("/", createUserController.handle);
userRouter.get("/get-by-email/:email", getUserByEmailController.handle);
userRouter.get("/", getUsersController.handle);

export { userRouter };

