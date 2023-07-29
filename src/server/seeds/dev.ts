import type { DbSeedFn } from '@wasp/dbSeed/types.js';

import { createTask } from '../actions.js';
import { createUser } from './seed.helper.js';

const seed: DbSeedFn = async (prisma) => {
  /*
  const user = await createUser(prisma, { email: 'martinsos@test.com', password: 'test1234' });

  await createTask(
    { description: 'My initial task' },
    { user, entities: { Task: prisma.task } }
  );
  */

  console.log('Seed Development');
};

export default seed;
