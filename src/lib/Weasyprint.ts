import { Config, WeasyprintConfig } from '../types';
import { Request, Response } from 'express';
import { spawn } from 'child_process';
import { PrintInput } from '../types';

export class WeasyprintParams {
  #config: object;

  constructor(config ?: WeasyprintConfig) {
    this.#config = config || {};
  }

  toArgs() {
    return Object
      .entries(this.#config)
      .map((pair) => `-${pair[0]} ${pair[1]}`)
      .concat(['-', '-']);
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

      w.stdin.write(input.html);
      w.stdin.end();
    });
  };
}
