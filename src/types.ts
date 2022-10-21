import { Logger } from 'winston';

export type Config = {
  logger: Logger
}

declare global {
  namespace Express {
    interface Request {
      logger: Logger
    }
  }
}
