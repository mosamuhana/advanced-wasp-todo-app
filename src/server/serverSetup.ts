import cors from 'cors';
import { ServerSetupFn, Application } from '@wasp/types';
import { MiddlewareConfigFn } from '@wasp/middleware';
import { mySpecialJob } from '@wasp/jobs/mySpecialJob.js';
import config from '@wasp/config.js';
import { sleep } from '@wasp/utils.js';

import { sayHi } from '../shared/util.js';

let someResource: string | undefined = undefined;

function addCustomRoute(app: Application) {
  app.get('/customRoute', (_req, res) => {
    res.set('Access-Control-Allow-Origin', 'example-cors-override.com');
    res.removeHeader('X-Frame-Options');
    res.send('I am a custom route');
  });
}

export const getSomeResource = () => someResource;

export const setup: ServerSetupFn = async ({ app }) => {
  addCustomRoute(app);

  sayHi();

  await sleep(2000);

  someResource = 'This resource is now set up.';
  console.log('Custom server setup done!');

  console.log('Kicking off Job...');
  // Or: const submittedJob = await mySpecialJob.delay(10).submit({ something: "here" })
  const submittedJob = await mySpecialJob.submit({ something: 'here' });
  console.log('[mySpecialJob]', submittedJob.jobId, submittedJob.jobName, submittedJob.executorName);
  console.log('submittedJob.pgBoss.details()', await submittedJob.pgBoss.details());
};

export const serverMiddlewareFn: MiddlewareConfigFn = (middlewareConfig) => {
  // Example of adding an extra domain to CORS.
  middlewareConfig.set(
    'cors',
    cors({ origin: [config.frontendUrl, 'http://127.0.0.1:3000'] })
  );
  return middlewareConfig;
};
