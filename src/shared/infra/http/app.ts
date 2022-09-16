import express from 'express';
import http from 'http';
import 'express-async-errors';

import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

const serverHttp = http.createServer(app);

export { app, serverHttp }