import { Router } from "express";
import { AppError } from "../errors/AppError";
import { authMiddleware } from "../middleware/auth.middleware";
import { AccountRepositoryInMemory } from "../modules/account/repository/in-memory/AccountRepositoryInMemory";
import { IncreaseAccountBalanceUseCase } from "../modules/account/usecases/increaseAccountBalanceUseCase/increaseAccountBalance.useCase";

const transactionRouter = Router();

const accountRepository = new AccountRepositoryInMemory();
const increaseAccountBalanceUseCase = new IncreaseAccountBalanceUseCase(
  accountRepository,
);

transactionRouter.post(
  "/deposit/:accountId",
  authMiddleware,
  async (req, res) => {
    const { accountId } = req.params;
    const { amount } = req.body;

    if (!accountId) {
      throw new AppError("Account ID is required", 400);
    }

    if (!amount) {
      throw new AppError("Amount is required", 400);
    }

    if (Number(amount) <= 0) {
      throw new AppError("Amount must be greater than 0", 400);
    }

    try {
      await increaseAccountBalanceUseCase.execute({ accountId, amount });

      res.status(200).send("Deposit successful");
    } catch (error) {
      throw new AppError(error.message, error.statusCode);
    }
  },
);

transactionRouter.post(
  "/withdraw/:accountId",
  authMiddleware,
  (req, res) => {},
);

transactionRouter.post(
  "/transfer/:accountId",
  authMiddleware,
  (req, res) => {},
);

export { transactionRouter };

