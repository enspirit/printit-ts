import * as pack from '../package.json';
import logger from './logger';
import fs from 'fs';
import { createApp } from './api';
const yaml = require('js-yaml');

const { version } = pack;
export { version };

export * from './errors';

try {
  const data = yaml.load(fs.readFileSync('config/printit.yml', 'utf8'));
  const config = Object.assign(data, {
    logger: logger,
  });
  const app = createApp(config);

  app.listen(3000, () => {
    console.log('Printit is now listening on http://0.0.0.0:3000');
  });
} catch (e) {
  console.log(e);
}
