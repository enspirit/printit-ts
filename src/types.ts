import { Logger } from 'winston';

export type Config = {
  logger: Logger
}

export type PrintInput = {
  html: String
  attachment ?: String
}

declare global {
  namespace Express {
    interface Request {
      logger: Logger
    }
  }
}
