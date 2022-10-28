import express, { Request } from 'express';
import defaultLogger from '../logger';
import { Config, PrintInput } from '../types';
import { Weasyprint } from '../lib/Weasyprint';
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

  app.use(express.urlencoded({ extended: true }));

  app.post('/', async (req: Request, res, next) => {
    try {
      const accept = req.header('Accept') || 'application/pdf';
      const input: PrintInput = req.body;
      if (accept !== 'application/pdf') {
        res.sendStatus(415);
      } else {
        res.setHeader('content-type', 'application/pdf');
        if (input.attachment) {
          res.setHeader('content-disposition', `attachment; filename="${req.body.attachment}"`);
        }
        res.status(200);
        return Weasyprint(config, req, res)(req.body);
      }
    } catch (error: any) {
      return next(error);
    }
  });

  // Log errors
  app.use(ErrorLogger);

  return app;
};