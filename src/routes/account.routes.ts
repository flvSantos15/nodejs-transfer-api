import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { CreateAccountController } from "../modules/account/usecases/createAccountUseCase/createAccount.controller";
import { GetAccountController } from "../modules/account/usecases/getAccountUseCase/getAccount.controller";

const accountRouter = Router();

const createAccountController = new CreateAccountController();
const getAccountController = new GetAccountController();

accountRouter.post(
  "/create-account/:userId",
  authMiddleware,
  createAccountController.handle,
);
accountRouter.get(
  "/balance/:userId",
  authMiddleware,
  getAccountController.handle,
);

export { accountRouter };

