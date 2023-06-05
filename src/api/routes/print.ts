import { Request, Response, NextFunction } from 'express';
import { PrintInput } from '../../types';
import sanitizer from '../../lib/sanitizer';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (!req.body.html) {
      return res.sendStatus(400);
    }

    const handler = req.config.handlers.find(h => h.accepts(req));
    if (!handler) {
      return res.sendStatus(415);
    }

    if (req.body.attachment) {
      const filename = encodeURIComponent(req.body.attachment);
      res.setHeader('content-disposition', `attachment; filename="${filename}"`);
    }

    const input: PrintInput = {
      ...req.body,
      html: sanitizer.sanitize(req.body.html),
    };
    const converter = handler.getConverter(req.config, req, res);
    await converter(input);
  } catch (error: any) {
    return next(error);
  }
};
