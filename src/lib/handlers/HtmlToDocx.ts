import html2docx from 'html-to-docx';
import { ContentType, Converter, Handler } from '../../types';

const HtmlToDocx: Handler = {
  accepts(req) {
    return !!req.accepts(ContentType.docx);
  },
  getConverter(config, req, res): Converter {
    return async (input) => {
      res.setHeader('content-type', ContentType.docx);
      const html = await html2docx(input.html, '', config.html2docx || {});

      res.send(html);
    };
  },
};

export default HtmlToDocx;
