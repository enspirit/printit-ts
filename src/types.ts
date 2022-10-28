import { Logger } from 'winston';

export type WeasyprintConfig = any

export type Config = {
  logger: Logger
  handler ?: String
  weasyprint?: WeasyprintConfig
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
