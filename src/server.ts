import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger.json";

import { AppError } from "./errors/AppError";
import { router } from "./routes";

const app = express();

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://your-production-domain.com"]
      : [
          "http://localhost:3000",
          "http://127.0.0.1:3000",
          "http://localhost:4200",
          "http://127.0.0.1:4200",
        ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  // @ts-ignore
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: `Internal server error: ${err.message}`,
    });
  },
);

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});

