import { Router } from "express";
import { authenticateRouter } from "./authenticate.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authenticateRouter);

export { router };

