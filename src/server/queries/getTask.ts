import HttpError from '@wasp/core/HttpError.js';
import { Task } from '@wasp/entities';
import { GetTask } from '@wasp/queries/types';

type Input = Pick<Task, 'id'>;
type QueryFn = GetTask<Input, Task>;

const query: QueryFn = async ({ id }, context) => {
  const { user, entities: { Task } } = context;

  if (!user) {
    throw new HttpError(401);
  }

  const task = await Task.findFirst({ where: { id, userId: user.id } });

  if (!task) {
    throw new HttpError(404);
  }

  return task;
};

export default query;
