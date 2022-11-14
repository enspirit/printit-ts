import { Logger } from 'winston';

export type CmdConfig = any

export type Config = {
  logger: Logger
  handler ?: String
  weasyprint?: CmdConfig
  wkhtmltopdf?: CmdConfig
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
