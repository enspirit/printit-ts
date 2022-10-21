import * as pack from '../package.json';
import logger from './logger';

const { version } = pack;
export { version };

export * from './errors';

import { createApp } from './api';

const config = {
  logger: logger,
};
const app = createApp(config);

app.listen(3000, () => {
  console.log('Printit is not listening on http://0.0.0.0:3000');
});
