import { Logger } from 'winston';

export type WeasyprintConfig = any

export type Config = {
  logger: Logger
  handler ?: string
  weasyprint?: WeasyprintConfig
}

export type PrintInput = {
  html: string
  attachment ?: string
}

declare global {
  namespace Express {
    interface Request {
      logger: Logger
    }
  }
}
