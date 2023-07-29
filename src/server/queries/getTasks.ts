import HttpError from '@wasp/core/HttpError.js';
import { Task } from '@wasp/entities';
import { GetTasks } from '@wasp/queries/types';

type QueryFn = GetTasks<void, Task[]>;

const query: QueryFn = async (_args, context) => {
  const { user, entities: { Task } } = context;

  if (!user) {
    throw new HttpError(401);
  }

  console.log('user who made the query: ', user);
  console.log('TEST_ENV_VAR', process.env.TEST_ENV_VAR);

  const tasks = await Task.findMany({
    where: { userId: user.id },
    orderBy: { id: 'asc' },
  });

  return tasks;
};

export default query;
