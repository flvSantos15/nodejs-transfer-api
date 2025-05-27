import { Router } from "express";
import { accountRouter } from "./account.routes";
import { authenticateRouter } from "./authenticate.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authenticateRouter);
router.use("/account", accountRouter);

export { router };

