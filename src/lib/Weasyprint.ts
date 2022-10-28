import { Request, Response } from 'express';
import { spawn } from 'child_process';
import { PrintInput } from '../types';

export function Weasyprint(req: Request, res: Response) {
  return function(input: PrintInput) {
    return new Promise((resolve, reject) => {
      const command = 'weasyprint';
      const args = ['-', '-'];
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
