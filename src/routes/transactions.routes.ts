import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { DepositController } from "../modules/transaction/usecases/depositUseCase/deposit.controller";

const transactionRouter = Router();

const depositController = new DepositController();

transactionRouter.post(
  "/deposit/:accountId",
  authMiddleware,
  depositController.handle,
);

// transactionRouter.post(
//   "/withdraw/:accountId",
//   authMiddleware,
//   (req, res) => {},
// );

// transactionRouter.post(
//   "/transfer/:accountId",
//   authMiddleware,
//   (req, res) => {},
// );

export { transactionRouter };

