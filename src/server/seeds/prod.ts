import type { DbSeedFn } from '@wasp/dbSeed/types.js';

import { createTask } from '../actions.js';
import { createUser } from './seed.helper.js';

const seed: DbSeedFn = async (prisma) => {
  /*
  const user = await createUser(prisma, { email: 'martinsosProd@test.com', password: 'test1234prod'});

  await createTask(
    { description: 'My initial task in production' },
    { user, entities: { Task: prisma.task } }
  );
  */

  console.log('Seed Production!');
}

export default seed;
