import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import "express-async-errors";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const serverHttp = http.createServer(app);

export { app, serverHttp };
