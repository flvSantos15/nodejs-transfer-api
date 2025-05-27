import { Router } from "express";
import { AuthenticateUserController } from "../modules/user/useCases/autheticateUserUseCase/authenticateUser.controller";

const authenticateRouter = Router();

const authenticateController = new AuthenticateUserController();

authenticateRouter.post("/login", authenticateController.handle);

export { authenticateRouter };

