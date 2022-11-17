import { Config, WeasyprintConfig } from '../types';
import { Request, Response } from 'express';
import { spawn } from 'child_process';
import { PrintInput } from '../types';
import sanitize from './sanitize';

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

export function Weasyprint(config: Config, req: Request, res: Response) {
  const wpParams = new WeasyprintParams(config.weasyprint);
  const command = 'weasyprint';
  const args = wpParams.toArgs();

  return function(input: PrintInput) {
    return new Promise((resolve, reject) => {
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
        resolve(null);
      });

      w.stdin.write(sanitize(input.html));
      w.stdin.end();
    });
  };
}
