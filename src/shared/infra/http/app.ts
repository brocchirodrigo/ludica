import AppError from "@error/AppError";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import http from "http";

import "express-async-errors";

import { router } from "./routes";

const app = express();

app.use(cors());

app.use(helmet({
  hidePoweredBy: true
}));

app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.status(200).json({ api: "ludica", status: "ok" });
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: `internal server error - ${err.message}`,
    });
  }
);

const serverHttp = http.createServer(app);

export { app, serverHttp };
