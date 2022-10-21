import { Request, Response, NextFunction } from 'express';
import { PrintitError } from '../../errors';

// Log requests once they finish (or fail)
export const RequestLogger = (req: Request, res: Response, next: NextFunction) => {
  let finished = false;
  const start = Date.now();
  const elapsed = () => `${Date.now() - start}ms`;

  res.on('finish', () => {
    finished = true;
    req.logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed()}`);
  });

  res.on('close', () => {
    if (!finished) {
      req.logger.warn(`${req.method} ${req.originalUrl} - ${elapsed()} - connection closed abruptly`);
    }
  });

  next();
};

export const ErrorLogger = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  req.logger.error({ error: err.constructor.name, message: err.message, request: { path: req.path, method: req.method } });
  if (err instanceof PrintitError) {
    res.status(err.httpCode).send({ error: err.message });
  } else {
    res.status(500).send({ error: err.message });
  }
};
