import express from 'express';
import defaultLogger from '../logger';
import { Config } from '../types';
import { ErrorLogger, RequestLogger } from './middlewares/loggers';

export const createApp = (config: Config): express.Express => {
  config.logger ||= defaultLogger;
  const app = express();

  // Install logger
  app.use((req, _res, next) => {
    req.logger = config.logger;
    next();
  });

  // Log requests
  app.use(RequestLogger);

  // Health-check
  app.get('/health-check', (_req, res, _next) => {
    res.sendStatus(204);
    throw new Error();
  });

  // Log errors
  app.use(ErrorLogger);

  return app;
};
