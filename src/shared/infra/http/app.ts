import AppError from "@error/AppError";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import http from "http";
import qs from "qs";

import typeformApi from "@shared/infra/http/service/typeform";

import "express-async-errors";

import { router } from "./routes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(router);

// async function chamada() {
//   const params = {
//     page_size: 200,
//   };

//   const responseApi = await typeformApi.get("/forms", {
//     params,
//     paramsSerializer: (params) => {
//       return qs.stringify(params);
//     },
//   });
//   const texto = JSON.stringify(responseApi.data);
//   return texto;
// }

// const result = chamada();

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
  // console.log(result);
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
