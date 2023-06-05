import type { Request, Response } from 'express';
import { DocumentOptions as HTMLDocumentOptions } from 'html-to-docx';
import { Logger } from 'winston';

declare global {
  namespace Express {
    interface Request {
      logger: Logger
      config: Config
    }
  }
}

export type WeasyprintConfig = any

export type Config = {
  logger: Logger
  handlers: Array<Handler>
  handler ?: string
  weasyprint?: WeasyprintConfig
  html2docx?: HTMLDocumentOptions
}

export type PrintInput = {
  html: string
  attachment ?: string
}

export type Converter = (input: PrintInput) => Promise<void>

export type Handler = {
  accepts(req: Request): Boolean,
  getConverter(config: Config, req: Request, res: Response): Converter
}

export enum ContentType {
  docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf = 'application/pdf'
}
