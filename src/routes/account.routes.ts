import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { CreateAccountController } from "../modules/account/usecases/createAccountUseCase/createAccount.controller";

const accountRouter = Router();

const createAccountController = new CreateAccountController();
const getAccountController = new GetAccountController();

accountRouter.post("/:userId", authMiddleware, createAccountController.handle);
accountRouter.get(
  "/:userId/:accountId",
  authMiddleware,
  getAccountController.handle,
);

export { accountRouter };

