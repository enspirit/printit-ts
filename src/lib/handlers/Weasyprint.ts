import { Config, ContentType, Converter, Handler, WeasyprintConfig } from '../../types';
import { Request, Response } from 'express';
import { spawn } from 'child_process';
import { PrintInput } from '../../types';

export class WeasyprintParams {
  #config: object;

  constructor(config ?: WeasyprintConfig) {
    this.#config = config || {};
  }

  toArgs(): string[] {
    return Object
      .entries(this.#config)
      .reduce((memo: string[], pair) => {
        return memo.concat(this.pairToArgs(pair));
      }, [])
      .concat(['-', '-']);
  }

  pairToArgs(pair: any) {
    if (Array.isArray(pair[1])) {
      return pair[1].reduce((memo, one) => memo.concat([`-${pair[0]}`, one]), []);
    } else {
      return [`-${pair[0]}`, pair[1]];
    }
  }
}

const Weasyprint: Handler = {
  accepts(req: Request): Boolean {
    return !!req.accepts(ContentType.pdf);
  },
  getConverter(config: Config, req: Request, res: Response): Converter {
    const wpParams = new WeasyprintParams(config.weasyprint);
    const command = 'weasyprint';
    const args = wpParams.toArgs();

    return function(input: PrintInput) {
      return new Promise((resolve, reject) => {
        res.setHeader('content-type', ContentType.pdf);

        req.logger.info(`${command} ${args.join(' ')}`);
        const w = spawn(command, args);

        w.stdout.pipe(res);

        w.stderr.on('data', (data: any) => {
          req.logger.error(data.toString());
        });

        w.on('error', (err: any) => {
          reject(err);
        });

        w.on('close', () => {
          resolve();
        });

        w.stdin.write(input.html);
        w.stdin.end();

        res.status(200);
      });
    };
  },
};

export default Weasyprint;
