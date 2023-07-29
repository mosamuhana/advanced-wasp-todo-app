import HttpError from '@wasp/core/HttpError.js';
import { DeleteTask } from '@wasp/actions/types';
import { Task } from '@wasp/entities';

type Input = Pick<Task, 'id'>;
type ActionFn = DeleteTask<Input, Task>;

const action: ActionFn = async ({ id }, context) => {
  const { user, entities: { Task } } = context;

  if (!user) {
    throw new HttpError(401);
  }

  const task = await Task.delete({ where: { id, userId: user.id } });

  if (!task) {
    throw new HttpError(404);
  }

  return task;
};

export default action;
