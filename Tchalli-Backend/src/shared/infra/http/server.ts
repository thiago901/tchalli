/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';
import AppError from '@shared/errors/AppError';

import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Server Internal Error',
  });
});

app.listen(3333, () => {
  console.log('Server started in port 3333!');
});
