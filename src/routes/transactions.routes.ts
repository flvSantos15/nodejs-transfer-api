import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { DepositController } from "../modules/transaction/usecases/depositUseCase/deposit.controller";
import { TransferController } from "../modules/transaction/usecases/transferUseCase/transfer.controller";
import { WithdrawController } from "../modules/transaction/usecases/widtdrawUseCase/withdraw.controller";

const transactionRouter = Router();

const depositController = new DepositController();
const withdrawController = new WithdrawController();
const transferController = new TransferController();

transactionRouter.post(
  "/deposit/:accountId",
  authMiddleware,
  depositController.handle,
);

transactionRouter.post(
  "/withdraw/:accountId",
  authMiddleware,
  withdrawController.handle,
);

transactionRouter.post(
  "/transfer/:accountId",
  authMiddleware,
  transferController.handle,
);

export { transactionRouter };

