import action from './actions/createTask.js';
import type { DbSeedFn } from '@wasp/dbSeed/types.js';
import { PrismaClient, type User } from '@prisma/client';

async function createUser(prismaClient: PrismaClient, data: any) {
  const { password, ...newUser } = await prismaClient.user.create({ data });
  return newUser as User;
}

export const devSeed: DbSeedFn = async (prismaClient) => {
  const user = await createUser(prismaClient, { username: 'martinsos', password: 'test1234' });

  await action(
    { description: 'My initial task' },
    { user, entities: { Task: prismaClient.task } }
  );

  console.log('Did simple dev seed!');
};

export const prodSeed: DbSeedFn = async (prismaClient) => {
  const user = await createUser(prismaClient, { username: 'martinsosProd', password: 'test1234prod'});

  await action(
    { description: 'My initial task in production' },
    { user, entities: { Task: prismaClient.task } }
  );

  console.log('Did seeding intended for production!');
};
