import express from 'express';
import defaultLogger from '../logger';
import { Config } from '../types';
import { ErrorLogger, RequestLogger } from './middlewares/loggers';
import printRoute from './routes/print';

export const createApp = (config: Config): express.Express => {
  config.logger ||= defaultLogger;
  const app = express();

  // Install logger
  app.use((req, _res, next) => {
    req.config = config;
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

  app.use(express.static('public'));
  app.use(express.json({ }));
  app.use(express.urlencoded({ extended: true }));

  app.post('/', printRoute);

  // Log errors
  app.use(ErrorLogger);

  return app;
};
